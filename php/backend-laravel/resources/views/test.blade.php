<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CountriesDB Laravel Validation Examples</title>
    <style>
        * { box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        h1 { color: #333; }
        .intro {
            background: white;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            background: white;
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .tab {
            padding: 12px 24px;
            background: #f0f0f0;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            color: #666;
            transition: all 0.2s;
        }
        .tab:hover {
            background: #e0e0e0;
        }
        .tab.active {
            background: #e83e8c;
            color: white;
        }
        .tab-content {
            display: none;
        }
        .tab-content.active {
            display: block;
        }
        .section-description {
            color: #666;
            margin-bottom: 20px;
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .endpoint-section {
            background: white;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .endpoint-section h2 {
            margin-top: 0;
            color: #e83e8c;
            font-size: 1.2em;
        }
        .endpoint-section h3 {
            color: #666;
            font-size: 0.9em;
            font-weight: normal;
            margin: 5px 0 15px 0;
        }
        form {
            display: grid;
            gap: 10px;
        }
        .form-group {
            display: flex;
            gap: 10px;
            align-items: center;
        }
        label {
            min-width: 100px;
            font-weight: 500;
        }
        input[type="text"], input[type="number"] {
            flex: 1;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
        }
        button {
            padding: 10px 20px;
            background: #e83e8c;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
        }
        button:hover {
            background: #d91a72;
        }
        .response {
            margin-top: 15px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 4px;
            border-left: 4px solid #28a745;
            display: none;
        }
        .response.error {
            border-left-color: #dc3545;
        }
        .response pre {
            margin: 0;
            white-space: pre-wrap;
            word-wrap: break-word;
            font-size: 13px;
        }
        .endpoint-url {
            font-family: monospace;
            background: #f0f0f0;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 0.9em;
        }
        .code-example {
            background: #f8f9fa;
            border-left: 4px solid #007bff;
            padding: 10px;
            margin-top: 10px;
            font-family: monospace;
            font-size: 12px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <h1>CountriesDB Laravel Validation Examples</h1>
    
    <div class="intro">
        <p>This example demonstrates two ways to use the <code>countriesdb/validator</code> package:</p>
        <ul>
            <li><strong>Laravel Validation Rules</strong> - Using <code>ValidCountry</code> and <code>ValidSubdivision</code> rules in form validation</li>
            <li><strong>Standalone Validator</strong> - Using the <code>Validator</code> class directly in controllers</li>
        </ul>
    </div>

    <div class="tabs">
        <button class="tab active" onclick="switchTab('rules')">Laravel Validation Rules</button>
        <button class="tab" onclick="switchTab('standalone')">Standalone Validator</button>
    </div>

    <!-- Validation Rules Tab -->
    <div id="tab-rules" class="tab-content active">
        <div class="section-description">
            These endpoints use Laravel's validation system with <code>ValidCountry</code> and <code>ValidSubdivision</code> rules.
            Validation errors are automatically handled by Laravel.
        </div>

        <div class="endpoint-section">
            <h2>1. Basic Country Validation</h2>
            <h3>POST <span class="endpoint-url">/api/validate/country/basic</span></h3>
            <div class="code-example">'country' => ['required', 'string', new ValidCountry()]</div>
            <form onsubmit="testEndpoint(event, '/api/validate/country/basic', {country: document.getElementById('country1').value})">
                <div class="form-group">
                    <label>Country:</label>
                    <input type="text" id="country1" value="US" placeholder="US" required>
                    <button type="submit">Test</button>
                </div>
                <div class="response" id="response-country1"></div>
            </form>
        </div>

        <div class="endpoint-section">
            <h2>2. Country with follow_upward</h2>
            <h3>POST <span class="endpoint-url">/api/validate/country/follow-upward</span></h3>
            <div class="code-example">'country' => ['required', 'string', new ValidCountry(followUpward: true)]</div>
            <form onsubmit="testEndpoint(event, '/api/validate/country/follow-upward', {country: document.getElementById('country2').value})">
                <div class="form-group">
                    <label>Country:</label>
                    <input type="text" id="country2" value="GF" placeholder="GF" required>
                    <button type="submit">Test</button>
                </div>
                <div class="response" id="response-country2"></div>
            </form>
        </div>

        <div class="endpoint-section">
            <h2>3. Multiple Countries</h2>
            <h3>POST <span class="endpoint-url">/api/validate/country/multiple</span></h3>
            <div class="code-example">'countries' => ['required', 'array'], 'countries.*' => ['required', 'string', new ValidCountry()]</div>
            <form onsubmit="testEndpoint(event, '/api/validate/country/multiple', {countries: document.getElementById('countries3').value.split(',').map(c => c.trim())})">
                <div class="form-group">
                    <label>Countries:</label>
                    <input type="text" id="countries3" value="US, CA, MX" placeholder="US, CA, MX" required>
                    <button type="submit">Test</button>
                </div>
                <div class="response" id="response-country3"></div>
            </form>
        </div>

        <div class="endpoint-section">
            <h2>4. Basic Subdivision</h2>
            <h3>POST <span class="endpoint-url">/api/validate/subdivision/basic</span></h3>
            <div class="code-example">'country' => ['required', 'string'], 'subdivision' => ['required', 'string', new ValidSubdivision('country')]</div>
            <form onsubmit="testEndpoint(event, '/api/validate/subdivision/basic', {country: document.getElementById('subdiv4-country').value, subdivision: document.getElementById('subdiv4-code').value})">
                <div class="form-group">
                    <label>Country:</label>
                    <input type="text" id="subdiv4-country" value="US" placeholder="US" required>
                </div>
                <div class="form-group">
                    <label>Subdivision:</label>
                    <input type="text" id="subdiv4-code" value="US-CA" placeholder="US-CA" required>
                    <button type="submit">Test</button>
                </div>
                <div class="response" id="response-subdiv4"></div>
            </form>
        </div>

        <div class="endpoint-section">
            <h2>5. Subdivision with follow_related</h2>
            <h3>POST <span class="endpoint-url">/api/validate/subdivision/follow-related</span></h3>
            <div class="code-example">'country' => ['required', 'string'], 'subdivision' => ['required', 'string', new ValidSubdivision('country', followRelated: true)]</div>
            <form onsubmit="testEndpoint(event, '/api/validate/subdivision/follow-related', {country: document.getElementById('subdiv5-country').value, subdivision: document.getElementById('subdiv5-code').value})">
                <div class="form-group">
                    <label>Country:</label>
                    <input type="text" id="subdiv5-country" value="FR" placeholder="FR" required>
                </div>
                <div class="form-group">
                    <label>Subdivision:</label>
                    <input type="text" id="subdiv5-code" value="FR-40" placeholder="FR-40" required>
                    <button type="submit">Test</button>
                </div>
                <div class="response" id="response-subdiv5"></div>
            </form>
        </div>

        <div class="endpoint-section">
            <h2>6. Subdivision with allow_parent_selection</h2>
            <h3>POST <span class="endpoint-url">/api/validate/subdivision/allow-parent</span></h3>
            <div class="code-example">'country' => ['required', 'string'], 'subdivision' => ['required', 'string', new ValidSubdivision('country', allowParentSelection: true)]</div>
            <form onsubmit="testEndpoint(event, '/api/validate/subdivision/allow-parent', {country: document.getElementById('subdiv6-country').value, subdivision: document.getElementById('subdiv6-code').value})">
                <div class="form-group">
                    <label>Country:</label>
                    <input type="text" id="subdiv6-country" value="FR" placeholder="FR" required>
                </div>
                <div class="form-group">
                    <label>Subdivision:</label>
                    <input type="text" id="subdiv6-code" value="FR-ARA" placeholder="FR-ARA" required>
                    <button type="submit">Test</button>
                </div>
                <div class="response" id="response-subdiv6"></div>
            </form>
        </div>

        <div class="endpoint-section">
            <h2>7. Multiple Subdivisions</h2>
            <h3>POST <span class="endpoint-url">/api/validate/subdivision/multiple</span></h3>
            <div class="code-example">'country' => ['required', 'string'], 'subdivisions' => ['required', 'array'], 'subdivisions.*' => ['required', 'string', new ValidSubdivision('country')]</div>
            <form onsubmit="testEndpoint(event, '/api/validate/subdivision/multiple', {country: document.getElementById('subdiv7-country').value, subdivisions: document.getElementById('subdiv7-codes').value.split(',').map(c => c.trim())})">
                <div class="form-group">
                    <label>Country:</label>
                    <input type="text" id="subdiv7-country" value="US" placeholder="US" required>
                </div>
                <div class="form-group">
                    <label>Subdivisions:</label>
                    <input type="text" id="subdiv7-codes" value="US-CA, US-NY, US-TX" placeholder="US-CA, US-NY, US-TX" required>
                    <button type="submit">Test</button>
                </div>
                <div class="response" id="response-subdiv7"></div>
            </form>
        </div>

        <div class="endpoint-section">
            <h2>8. Empty Subdivision</h2>
            <h3>POST <span class="endpoint-url">/api/validate/subdivision/empty</span></h3>
            <div class="code-example">'country' => ['required', 'string'], 'subdivision' => ['nullable', 'string', new ValidSubdivision('country')]</div>
            <form onsubmit="testEndpoint(event, '/api/validate/subdivision/empty', {country: document.getElementById('subdiv8-country').value, subdivision: null})">
                <div class="form-group">
                    <label>Country:</label>
                    <input type="text" id="subdiv8-country" value="AQ" placeholder="AQ" required>
                    <button type="submit">Test</button>
                </div>
                <div class="response" id="response-subdiv8"></div>
            </form>
        </div>
    </div>

    <!-- Standalone Validator Tab -->
    <div id="tab-standalone" class="tab-content">
        <div class="section-description">
            These endpoints use the <code>Validator</code> class directly in controllers, giving you full control over validation logic and error handling.
        </div>

        <div class="endpoint-section">
            <h2>1. Basic Country Validation</h2>
            <h3>POST <span class="endpoint-url">/api/validate/standalone/country/basic</span></h3>
            <div class="code-example">$validator = new Validator($apiKey); $result = $validator->validateCountry($code);</div>
            <form onsubmit="testEndpoint(event, '/api/validate/standalone/country/basic', {code: document.getElementById('standalone-country1').value})">
                <div class="form-group">
                    <label>Code:</label>
                    <input type="text" id="standalone-country1" value="US" placeholder="US" required>
                    <button type="submit">Test</button>
                </div>
                <div class="response" id="response-standalone-country1"></div>
            </form>
        </div>

        <div class="endpoint-section">
            <h2>2. Country with follow_upward</h2>
            <h3>POST <span class="endpoint-url">/api/validate/standalone/country/follow-upward</span></h3>
            <div class="code-example">$result = $validator->validateCountry($code, followUpward: true);</div>
            <form onsubmit="testEndpoint(event, '/api/validate/standalone/country/follow-upward', {code: document.getElementById('standalone-country2').value})">
                <div class="form-group">
                    <label>Code:</label>
                    <input type="text" id="standalone-country2" value="GF" placeholder="GF" required>
                    <button type="submit">Test</button>
                </div>
                <div class="response" id="response-standalone-country2"></div>
            </form>
        </div>

        <div class="endpoint-section">
            <h2>3. Multiple Countries</h2>
            <h3>POST <span class="endpoint-url">/api/validate/standalone/country/multiple</span></h3>
            <div class="code-example">$results = $validator->validateCountries($codes);</div>
            <form onsubmit="testEndpoint(event, '/api/validate/standalone/country/multiple', {codes: document.getElementById('standalone-countries3').value.split(',').map(c => c.trim())})">
                <div class="form-group">
                    <label>Codes:</label>
                    <input type="text" id="standalone-countries3" value="US, CA, MX" placeholder="US, CA, MX" required>
                    <button type="submit">Test</button>
                </div>
                <div class="response" id="response-standalone-country3"></div>
            </form>
        </div>

        <div class="endpoint-section">
            <h2>4. Basic Subdivision</h2>
            <h3>POST <span class="endpoint-url">/api/validate/standalone/subdivision/basic</span></h3>
            <div class="code-example">$result = $validator->validateSubdivision($code, $country);</div>
            <form onsubmit="testEndpoint(event, '/api/validate/standalone/subdivision/basic', {country: document.getElementById('standalone-subdiv4-country').value, code: document.getElementById('standalone-subdiv4-code').value})">
                <div class="form-group">
                    <label>Country:</label>
                    <input type="text" id="standalone-subdiv4-country" value="US" placeholder="US" required>
                </div>
                <div class="form-group">
                    <label>Code:</label>
                    <input type="text" id="standalone-subdiv4-code" value="US-CA" placeholder="US-CA" required>
                    <button type="submit">Test</button>
                </div>
                <div class="response" id="response-standalone-subdiv4"></div>
            </form>
        </div>

        <div class="endpoint-section">
            <h2>5. Subdivision with follow_related</h2>
            <h3>POST <span class="endpoint-url">/api/validate/standalone/subdivision/follow-related</span></h3>
            <div class="code-example">$result = $validator->validateSubdivision($code, $country, followRelated: true);</div>
            <form onsubmit="testEndpoint(event, '/api/validate/standalone/subdivision/follow-related', {country: document.getElementById('standalone-subdiv5-country').value, code: document.getElementById('standalone-subdiv5-code').value})">
                <div class="form-group">
                    <label>Country:</label>
                    <input type="text" id="standalone-subdiv5-country" value="FR" placeholder="FR" required>
                </div>
                <div class="form-group">
                    <label>Code:</label>
                    <input type="text" id="standalone-subdiv5-code" value="FR-40" placeholder="FR-40" required>
                    <button type="submit">Test</button>
                </div>
                <div class="response" id="response-standalone-subdiv5"></div>
            </form>
        </div>

        <div class="endpoint-section">
            <h2>6. Subdivision with allow_parent_selection</h2>
            <h3>POST <span class="endpoint-url">/api/validate/standalone/subdivision/allow-parent</span></h3>
            <div class="code-example">$result = $validator->validateSubdivision($code, $country, allowParentSelection: true);</div>
            <form onsubmit="testEndpoint(event, '/api/validate/standalone/subdivision/allow-parent', {country: document.getElementById('standalone-subdiv6-country').value, code: document.getElementById('standalone-subdiv6-code').value})">
                <div class="form-group">
                    <label>Country:</label>
                    <input type="text" id="standalone-subdiv6-country" value="FR" placeholder="FR" required>
                </div>
                <div class="form-group">
                    <label>Code:</label>
                    <input type="text" id="standalone-subdiv6-code" value="FR-ARA" placeholder="FR-ARA" required>
                    <button type="submit">Test</button>
                </div>
                <div class="response" id="response-standalone-subdiv6"></div>
            </form>
        </div>

        <div class="endpoint-section">
            <h2>7. Multiple Subdivisions</h2>
            <h3>POST <span class="endpoint-url">/api/validate/standalone/subdivision/multiple</span></h3>
            <div class="code-example">$results = $validator->validateSubdivisions($codes, $country);</div>
            <form onsubmit="testEndpoint(event, '/api/validate/standalone/subdivision/multiple', {country: document.getElementById('standalone-subdiv7-country').value, codes: document.getElementById('standalone-subdiv7-codes').value.split(',').map(c => c.trim())})">
                <div class="form-group">
                    <label>Country:</label>
                    <input type="text" id="standalone-subdiv7-country" value="US" placeholder="US" required>
                </div>
                <div class="form-group">
                    <label>Codes:</label>
                    <input type="text" id="standalone-subdiv7-codes" value="US-CA, US-NY, US-TX" placeholder="US-CA, US-NY, US-TX" required>
                    <button type="submit">Test</button>
                </div>
                <div class="response" id="response-standalone-subdiv7"></div>
            </form>
        </div>

        <div class="endpoint-section">
            <h2>8. Empty Subdivision</h2>
            <h3>POST <span class="endpoint-url">/api/validate/standalone/subdivision/empty</span></h3>
            <div class="code-example">$result = $validator->validateSubdivision(null, $country);</div>
            <form onsubmit="testEndpoint(event, '/api/validate/standalone/subdivision/empty', {country: document.getElementById('standalone-subdiv8-country').value})">
                <div class="form-group">
                    <label>Country:</label>
                    <input type="text" id="standalone-subdiv8-country" value="AQ" placeholder="AQ" required>
                    <button type="submit">Test</button>
                </div>
                <div class="response" id="response-standalone-subdiv8"></div>
            </form>
        </div>
    </div>

    <script>
        function switchTab(tabName) {
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Remove active class from all tabs
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show selected tab content
            document.getElementById('tab-' + tabName).classList.add('active');
            
            // Add active class to clicked tab
            event.target.classList.add('active');
        }

        async function testEndpoint(event, endpoint, payload) {
            event.preventDefault();
            const responseDiv = event.target.querySelector('.response');
            responseDiv.style.display = 'block';
            responseDiv.className = 'response';
            responseDiv.innerHTML = '<pre>Loading...</pre>';

            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();
                responseDiv.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
                
                if (!response.ok) {
                    responseDiv.className = 'response error';
                }
            } catch (error) {
                responseDiv.className = 'response error';
                responseDiv.innerHTML = '<pre>Error: ' + error.message + '</pre>';
            }
        }
    </script>
</body>
</html>
