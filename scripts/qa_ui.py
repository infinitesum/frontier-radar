#!/usr/bin/env python3
"""Offline UI regression test with Playwright (no network access required)."""
from pathlib import Path
import json
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
INDEX = (ROOT/'dist/index.html').read_text('utf-8')
INDEX = INDEX.replace('<link rel="stylesheet" href="./styles.css" />','')
INDEX = INDEX.replace('<script src="./app.js" type="module"></script>','')
STYLE = (ROOT/'dist/styles.css').read_text('utf-8')
SCRIPT = (ROOT/'dist/app.js').read_text('utf-8')
DATA={p.stem:json.loads(p.read_text('utf-8')) for p in (ROOT/'dist/data').glob('*.json')}


def ready(page):
    page.set_content(INDEX)
    page.add_style_tag(content=STYLE)
    page.evaluate("""data => {
      window.fetch = async (url) => {
        const key = String(url).split('/').pop().replace('.json','');
        return {ok: Object.prototype.hasOwnProperty.call(data,key),
                json: async () => data[key], status: 200};
      };
    }""", DATA)
    page.add_script_tag(content=SCRIPT, type='module')
    page.locator('.stat-card').first.wait_for(timeout=15000)


if __name__=='__main__':
    with sync_playwright() as p:
        browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
        desktop=browser.new_page(viewport={'width':1440,'height':950}, device_scale_factor=1)
        errors=[]
        desktop.on('pageerror',lambda e: errors.append(str(e)))
        ready(desktop)
        desktop.screenshot(path='/mnt/data/frontier-radar-desktop.png',full_page=True)
        print('Desktop title:',desktop.title())
        print('First heading:',desktop.locator('h1').inner_text())
        print('Cards:',desktop.locator('.paper-row').count())
        print('Stats:',desktop.locator('.stat-card').all_inner_texts())
        desktop.locator('[data-page="papers"]').first.click()
        print('Papers page rows:',desktop.locator('.paper-row').count())
        desktop.locator('#paper-search').fill('Wells Fargo')
        print('Filter rows Wells Fargo:',desktop.locator('.paper-row').count())
        desktop.locator('[data-action="save"]').first.click()
        print('Bookmark count:',desktop.locator('#saved-counter').inner_text())
        desktop.locator('.paper-title').first.click()
        print('Dialog visible:',desktop.locator('#paper-dialog').is_visible())
        desktop.locator('[data-action="close"]').click()
        desktop.locator('[data-page="sources"]').first.click()
        print('Source table rows:',desktop.locator('.coverage-table tbody tr').count())
        print('JS errors:',errors)
        mobile=browser.new_page(viewport={'width':390,'height':844}, device_scale_factor=1)
        mobile.on('pageerror',lambda e: errors.append(str(e)))
        ready(mobile)
        mobile.screenshot(path='/mnt/data/frontier-radar-mobile.png',full_page=True)
        print('Mobile body width:',mobile.evaluate('document.body.scrollWidth'),'viewport:',mobile.evaluate('innerWidth'))
        print('Mobile cards:',mobile.locator('.paper-row').count())
        assert not errors, errors
        assert mobile.evaluate('document.body.scrollWidth <= innerWidth+2')
        browser.close()
