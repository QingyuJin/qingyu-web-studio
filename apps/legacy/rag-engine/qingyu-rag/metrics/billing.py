"""
Token billing helpers.

The engine stores raw input/output token counts in metrics. This module adds a
small pricing layer so generation logs can estimate cost automatically while
still allowing production deployments to override rates from environment vars.
"""
from __future__ import annotations

import os
from dataclasses import asdict, dataclass


@dataclass(frozen=True)
class TokenPricing:
    input_usd_per_1k: float
    output_usd_per_1k: float
    currency: str = "USD"


DEFAULT_PRICING = TokenPricing(
    input_usd_per_1k=0.003,
    output_usd_per_1k=0.015,
)

NO_COST_MODEL_PREFIXES = ("local-", "mock-", "demo-")


def _env_float(name: str, fallback: float) -> float:
    raw = os.environ.get(name)
    if raw is None:
        return fallback
    try:
        return float(raw)
    except ValueError:
        return fallback


def usd_to_twd_rate() -> float:
    return _env_float("RAG_USD_TO_TWD", 32.0)


def pricing_for_model(model: str | None = None) -> TokenPricing:
    """Return the active token pricing profile.

    Set these env vars in production if the provider/model pricing changes:
    - RAG_INPUT_USD_PER_1K_TOKENS
    - RAG_OUTPUT_USD_PER_1K_TOKENS
    """
    if model and model.startswith(NO_COST_MODEL_PREFIXES):
        return TokenPricing(input_usd_per_1k=0.0, output_usd_per_1k=0.0)

    return TokenPricing(
        input_usd_per_1k=_env_float(
            "RAG_INPUT_USD_PER_1K_TOKENS",
            DEFAULT_PRICING.input_usd_per_1k,
        ),
        output_usd_per_1k=_env_float(
            "RAG_OUTPUT_USD_PER_1K_TOKENS",
            DEFAULT_PRICING.output_usd_per_1k,
        ),
    )


def estimate_token_usage_cost(
    *,
    input_tokens: int = 0,
    output_tokens: int = 0,
    model: str | None = None,
) -> dict:
    pricing = pricing_for_model(model)
    input_cost = max(input_tokens, 0) / 1000 * pricing.input_usd_per_1k
    output_cost = max(output_tokens, 0) / 1000 * pricing.output_usd_per_1k
    total_cost = input_cost + output_cost
    twd_rate = usd_to_twd_rate()

    return {
        "model": model,
        "input_tokens": max(input_tokens, 0),
        "output_tokens": max(output_tokens, 0),
        "total_tokens": max(input_tokens, 0) + max(output_tokens, 0),
        "pricing": asdict(pricing),
        "input_cost_usd": round(input_cost, 8),
        "output_cost_usd": round(output_cost, 8),
        "total_cost_usd": round(total_cost, 8),
        "estimated_cost_twd": round(total_cost * twd_rate, 4),
        "usd_to_twd": twd_rate,
    }
