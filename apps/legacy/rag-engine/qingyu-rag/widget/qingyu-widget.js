/**
 * Qingyu RAG 嵌入式問答 Widget
 *
 * 使用方式（放進 qingyuweb.com 的方塊裡）：
 *   <script src="https://cdn.your-domain.com/qingyu-widget.js"></script>
 *   <qingyu-chat-widget
 *     api-base="https://api.your-domain.com"
 *     token-endpoint="https://qingyuweb.com/api/widget-token"
 *     title="客服小幫手"
 *     theme-color="#4f46e5"
 *   ></qingyu-chat-widget>
 *
 * 設計重點：
 *   - 用 Shadow DOM 隔離樣式，不會被 qingyuweb.com 頁面的 CSS 影響，也不會污染外部頁面
 *   - 不帶長期 API Key，只透過 token-endpoint（qingyuweb.com 自己的後端）換短期 widget JWT
 *   - token 快過期時自動用 token-endpoint 換新的，使用者無感
 *   - 沒有任何外部相依套件，單一檔案，直接用 <script> 引入即可
 */
(function () {
  "use strict";

  const TEMPLATE = `
    <style>
      :host {
        all: initial;
        --qy-primary: var(--qy-theme-color, #4f46e5);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang TC", "Microsoft JhengHei", sans-serif;
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999999;
      }
      * { box-sizing: border-box; }

      .qy-bubble {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: var(--qy-primary);
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 14px rgba(0,0,0,0.25);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        transition: transform 0.15s ease;
      }
      .qy-bubble:hover { transform: scale(1.06); }

      .qy-panel {
        display: none;
        flex-direction: column;
        position: absolute;
        bottom: 72px;
        right: 0;
        width: 340px;
        height: 460px;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        overflow: hidden;
      }
      .qy-panel.open { display: flex; }

      .qy-header {
        background: var(--qy-primary);
        color: white;
        padding: 14px 16px;
        font-size: 15px;
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .qy-header button {
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 18px;
        line-height: 1;
        opacity: 0.85;
      }
      .qy-header button:hover { opacity: 1; }

      .qy-messages {
        flex: 1;
        overflow-y: auto;
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: #f7f7fb;
        font-size: 13.5px;
      }

      .qy-msg {
        max-width: 85%;
        padding: 8px 12px;
        border-radius: 12px;
        line-height: 1.5;
        white-space: pre-wrap;
        word-break: break-word;
      }
      .qy-msg.user {
        align-self: flex-end;
        background: var(--qy-primary);
        color: white;
        border-bottom-right-radius: 4px;
      }
      .qy-msg.bot {
        align-self: flex-start;
        background: white;
        color: #222;
        border: 1px solid #eee;
        border-bottom-left-radius: 4px;
      }
      .qy-msg.bot.loading { color: #999; font-style: italic; }
      .qy-msg.bot.error { color: #b91c1c; background: #fef2f2; border-color: #fecaca; }

      .qy-citations {
        margin-top: 6px;
        font-size: 11.5px;
        color: #666;
      }
      .qy-citations .qy-cite {
        display: inline-block;
        margin: 2px 4px 0 0;
        padding: 2px 6px;
        background: #eee;
        border-radius: 6px;
        cursor: default;
      }

      .qy-input-row {
        display: flex;
        gap: 8px;
        padding: 10px;
        border-top: 1px solid #eee;
        background: white;
      }
      .qy-input-row input {
        flex: 1;
        border: 1px solid #ddd;
        border-radius: 20px;
        padding: 9px 14px;
        font-size: 13.5px;
        outline: none;
      }
      .qy-input-row input:focus { border-color: var(--qy-primary); }
      .qy-input-row button {
        background: var(--qy-primary);
        color: white;
        border: none;
        border-radius: 20px;
        padding: 0 16px;
        cursor: pointer;
        font-size: 13.5px;
        font-weight: 600;
      }
      .qy-input-row button:disabled { opacity: 0.5; cursor: not-allowed; }
    </style>

    <button class="qy-bubble" part="bubble" aria-label="開啟問答視窗">💬</button>
    <div class="qy-panel">
      <div class="qy-header">
        <span class="qy-title"></span>
        <button class="qy-close" aria-label="關閉">✕</button>
      </div>
      <div class="qy-messages"></div>
      <div class="qy-input-row">
        <input type="text" placeholder="輸入你的問題..." />
        <button class="qy-send">送出</button>
      </div>
    </div>
  `;

  class QingyuChatWidget extends HTMLElement {
    constructor() {
      super();
      this._token = null;
      this._tokenExpiresAt = 0;
      this._pendingRequest = false;

      const shadow = this.attachShadow({ mode: "open" });
      shadow.innerHTML = TEMPLATE;

      this.$bubble = shadow.querySelector(".qy-bubble");
      this.$panel = shadow.querySelector(".qy-panel");
      this.$close = shadow.querySelector(".qy-close");
      this.$title = shadow.querySelector(".qy-title");
      this.$messages = shadow.querySelector(".qy-messages");
      this.$input = shadow.querySelector(".qy-input-row input");
      this.$send = shadow.querySelector(".qy-send");
    }

    static get observedAttributes() {
      return ["theme-color", "title"];
    }

    attributeChangedCallback(name, _old, value) {
      if (name === "theme-color" && value) {
        this.style.setProperty("--qy-theme-color", value);
      }
      if (name === "title") {
        this.$title.textContent = value || "問答小幫手";
      }
    }

    connectedCallback() {
      this.$title.textContent = this.getAttribute("title") || "問答小幫手";
      if (this.getAttribute("theme-color")) {
        this.style.setProperty("--qy-theme-color", this.getAttribute("theme-color"));
      }

      this.$bubble.addEventListener("click", () => this._togglePanel(true));
      this.$close.addEventListener("click", () => this._togglePanel(false));
      this.$send.addEventListener("click", () => this._sendMessage());
      this.$input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") this._sendMessage();
      });

      this._appendMessage(
        "bot",
        this.getAttribute("welcome-message") || "嗨，有什麼想問的都可以直接輸入喔！"
      );
    }

    _togglePanel(open) {
      this.$panel.classList.toggle("open", open);
      if (open) this.$input.focus();
    }

    _appendMessage(role, text, { loading = false, error = false, citations = [] } = {}) {
      const el = document.createElement("div");
      el.className = `qy-msg ${role}${loading ? " loading" : ""}${error ? " error" : ""}`;
      el.textContent = text;

      if (citations && citations.length > 0) {
        const citeWrap = document.createElement("div");
        citeWrap.className = "qy-citations";
        citations.forEach((c) => {
          const tag = document.createElement("span");
          tag.className = "qy-cite";
          tag.textContent = `[${c.index}] ${c.text_snippet || c.doc_id}`;
          citeWrap.appendChild(tag);
        });
        el.appendChild(citeWrap);
      }

      this.$messages.appendChild(el);
      this.$messages.scrollTop = this.$messages.scrollHeight;
      return el;
    }

    async _ensureToken() {
      const now = Date.now();
      // 提前 30 秒換 token，避免請求送出瞬間剛好過期
      if (this._token && now < this._tokenExpiresAt - 30000) {
        return this._token;
      }

      const tokenEndpoint = this.getAttribute("token-endpoint");
      if (!tokenEndpoint) {
        throw new Error("缺少 token-endpoint 屬性，無法取得問答權杖");
      }

      const resp = await fetch(tokenEndpoint, { method: "POST", credentials: "include" });
      if (!resp.ok) {
        throw new Error(`無法取得問答權杖（HTTP ${resp.status}）`);
      }
      const data = await resp.json();
      this._token = data.token;
      this._tokenExpiresAt = now + (data.expires_in_seconds || 900) * 1000;
      return this._token;
    }

    async _sendMessage() {
      const query = this.$input.value.trim();
      if (!query || this._pendingRequest) return;

      this.$input.value = "";
      this._appendMessage("user", query);
      const loadingEl = this._appendMessage("bot", "思考中...", { loading: true });

      this._pendingRequest = true;
      this.$send.disabled = true;

      try {
        const token = await this._ensureToken();
        const apiBase = this.getAttribute("api-base");
        if (!apiBase) throw new Error("缺少 api-base 屬性");

        const resp = await fetch(`${apiBase}/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query }),
        });

        loadingEl.remove();

        if (!resp.ok) {
          const detail = await resp.text();
          this._appendMessage("bot", `發生錯誤，請稍後再試（${resp.status}）`, { error: true });
          console.error("Qingyu widget chat error:", detail);
          return;
        }

        const data = await resp.json();
        this._appendMessage("bot", data.answer, { citations: data.citations });
      } catch (err) {
        loadingEl.remove();
        this._appendMessage("bot", `發生錯誤：${err.message}`, { error: true });
        console.error("Qingyu widget error:", err);
      } finally {
        this._pendingRequest = false;
        this.$send.disabled = false;
      }
    }
  }

  if (!customElements.get("qingyu-chat-widget")) {
    customElements.define("qingyu-chat-widget", QingyuChatWidget);
  }
})();
