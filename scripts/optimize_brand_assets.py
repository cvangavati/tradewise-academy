from pathlib import Path

from PIL import Image

assets = Path("/home/ubuntu/tradewise-academy/assets/images")
for filename in ["icon.png", "splash-icon.png", "favicon.png", "android-icon-foreground.png"]:
    target = assets / filename
    with Image.open(target) as original:
        image = original.convert("RGBA")
        image.thumbnail((512, 512), Image.Resampling.LANCZOS)
        image.save(target, "PNG", optimize=True, compress_level=9)
        print(f"{filename}: {image.size[0]}x{image.size[1]}, {target.stat().st_size} bytes")
