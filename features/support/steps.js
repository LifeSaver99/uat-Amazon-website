/*
 ******************************************************************************
 * Cucumber/Gherkin
 * ============================================================================
 * 
 * NOTES:
 * - Arrow functions not supported by cucumber when accessing the 'world' class
 *   SEE: github.com/cucumber/cucumber-js/blob/main/docs/support_files/world.md
 * 
 ******************************************************************************
*/

const {After, Before, Given, Then, When} = require('@cucumber/cucumber');
const assert = require('assert');
const path = require('path');
const timeout = 10000;

Before({timeout}, async function() {
    this.browserBuild();
});

After({timeout}, async function() {
    await this.browserExit();
});

Given('the {word} page', {timeout}, async function(page) {
    const pages = {
        'youtube': 'https://amazon.co.uk'
    }

    assert((pages[page] != null), 'Page not supported!');
    await this.browserNavigate(pages[page]);
});


When('the {word} is searched', async function(football) {
    this.text = football;

    const searchInput = await this.getElement('twotabsearchtextbox');
    const searchSubmit = await this.getElement('nav-search-submit-button');

    await searchInput.sendKeys(football);
    await searchSubmit.click();
    // await this.waitForElementByCss('.nav-search-submit-text nav-sprite nav-progressive-attribute', timeout);
});

Then('the {string} element should be {word}', async function(name, state) {
    const ids = {
        'search submit-button': 'nav-search-submit-button',
        'search input': 'twotabsearchtextbox',
        'Sign-in securely': 'a-autoid-0-announce'
    };

    const selectors = {
        'search input': 'getElement',
        'Sign-in securely': 'getElement',
        'search submit-button': 'getElement'

    };

    const tags = {
        'search submit-button': 'input',
        'search input': 'input',
        'Sign-in securely': 'span'
    };

    const id = ids[name];
    const selector = selectors[name];
    const tag = tags[name];

    assert((id != null), 'Element not supported!');
    assert((selector != null), 'Selector not supported!');
    assert((tag != null), 'Tag not supported!');


Then('the {string} element should be {word}', async function(name, state) {
    const ids = {
        'search submit-button': 'nav-search-submit-button',
        'search input': 'twotabsearchtextbox',
        'Sign-in securely': 'a-autoid-0-announce'
    };

    const selectors = {
        'search input': 'getElement',
        'Sign-in securely': 'getElement',
        'search submit-button': 'getElement'

    };

    const tags = {
        'search submit-button': 'input',
        'search input': 'input',
        'Sign-in securely': 'span'
    };

    const id = ids[name];
    const selector = selectors[name];
    const tag = tags[name];

    assert((id != null), 'Element not supported!');
    assert((selector != null), 'Selector not supported!');
    assert((tag != null), 'Tag not supported!');

    switch(state) {
        case 'matching':
        case 'there': {
            const element = await this[selector](id);
            const actualTag = await element.getTagName();
            assert((actualTag == tag), 'Element is not of the correct type!');

            if (state == 'matching') {
                const actualText = await element.getText();
                console.log('ACTUAL TEXT: '+actualText+'!');
                assert((actualText == this.text), 'Element text does not match!');
            }
            
            break;
        }

        case 'missing': {
            assert.rejects(async () => await this[selector](id), 'Element exists when it should not!');
            break;
        }
        
        default: {
            assert.fail('State not supported!');
            break;
        }
    }
});