"""Create web-ready copies of beauty preview photography without touching originals."""

from pathlib import Path

from PIL import Image


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = PROJECT_ROOT / "apps" / "legacy" / "public" / "beauty-preview"
OUTPUT_DIR = SOURCE_DIR / "optimized"
MAX_LONG_EDGE = 1800


def optimize(source: Path) -> None:
    destination = OUTPUT_DIR / f"{source.stem}.webp"

    with Image.open(source) as image:
        image = image.convert("RGB")
        if max(image.size) > MAX_LONG_EDGE:
            image.thumbnail((MAX_LONG_EDGE, MAX_LONG_EDGE), Image.Resampling.LANCZOS)
        image.save(destination, "WEBP", quality=82, method=6)

    print(f"{source.name} -> {destination.name}")


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for source in sorted(SOURCE_DIR.glob("*.jpg")):
        optimize(source)


if __name__ == "__main__":
    main()
