import re

# Read the SVG
with open('/Users/sandeep/Downloads/bazo-design-2/Landing page draft/home page.svg', 'r') as f:
    content = f.read()

# Extract hero section (first 900px of height)
# Find all groups and elements within the hero area
hero_match = re.search(r'(<g clip-path="url\(#clip0_495_2212\)".*?</g>)', content, re.DOTALL)
if hero_match:
    hero_svg = f'''<svg width="1232" height="827" viewBox="24 24 1232 827" fill="none" xmlns="http://www.w3.org/2000/svg">
{hero_match.group(1)}
</svg>'''
    with open('/Users/sandeep/bazo-landing/public/images/hero.svg', 'w') as f:
        f.write(hero_svg)
    print("Hero section extracted")
else:
    print("Hero section not found")
