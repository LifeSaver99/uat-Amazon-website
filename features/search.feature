Feature: AMAZON WEBSITE 

    Scenario: Initially has a search bar
        Given the amazon page
        Then the 'search input' element should be there

    Scenario: Initially has a search bar
        Given the amazon page
        Then the 'Sign-in securely' element should be there

    Scenario: Initially has a search bar
        Given the amazon page
        Then the 'search submit-button' element should be there

    Scenario: Returns searched heading
        Given the amazon page
        When the football is searched
        Then the 'football' element should be there
    

