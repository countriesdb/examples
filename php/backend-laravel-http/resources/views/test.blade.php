<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CountriesDB Laravel Http Examples</title>
    <style>
        * { box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        h1 { color: #333; }
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
    </style>
</head>
<body>
    <h1>CountriesDB Laravel Http Examples</h1>
    <p>Test all validation endpoints below. Each form will make a POST request and display the JSON response.</p>

    <!-- Country Validation -->
    <div class="endpoint-section">
        <h2>1. Basic Country Validation</h2>
        <h3>POST <span class="endpoint-url">/api/validate/country/basic</span></h3>
        <form onsubmit="testEndpoint(event, '/api/validate/country/basic', {code: document.getElementById('country1').value})">
            <div class="form-group">
                <label>Code:</label>
                <input type="text" id="country1" value="US" placeholder="US" required>
                <button type="submit">Test</button>
            </div>
            <div class="response" id="response-country1"></div>
        </form>
    </div>

    <div class="endpoint-section">
        <h2>2. Country with follow_upward</h2>
        <h3>POST <span class="endpoint-url">/api/validate/country/follow-upward</span></h3>
        <form onsubmit="testEndpoint(event, '/api/validate/country/follow-upward', {code: document.getElementById('country2').value})">
            <div class="form-group">
                <label>Code:</label>
                <input type="text" id="country2" value="GF" placeholder="GF" required>
                <button type="submit">Test</button>
            </div>
            <div class="response" id="response-country2"></div>
        </form>
    </div>

    <div class="endpoint-section">
        <h2>3. Multiple Countries</h2>
        <h3>POST <span class="endpoint-url">/api/validate/country/multiple</span></h3>
        <form onsubmit="testEndpoint(event, '/api/validate/country/multiple', {codes: document.getElementById('countries3').value.split(',').map(c => c.trim())})">
            <div class="form-group">
                <label>Codes:</label>
                <input type="text" id="countries3" value="US, CA, MX, FR" placeholder="US, CA, MX, FR" required>
                <button type="submit">Test</button>
            </div>
            <div class="response" id="response-country3"></div>
        </form>
    </div>

    <!-- Subdivision Validation -->
    <div class="endpoint-section">
        <h2>4. Basic Subdivision</h2>
        <h3>POST <span class="endpoint-url">/api/validate/subdivision/basic</span></h3>
        <form onsubmit="testEndpoint(event, '/api/validate/subdivision/basic', {country: document.getElementById('subdiv4-country').value, code: document.getElementById('subdiv4-code').value})">
            <div class="form-group">
                <label>Country:</label>
                <input type="text" id="subdiv4-country" value="US" placeholder="US" required>
            </div>
            <div class="form-group">
                <label>Code:</label>
                <input type="text" id="subdiv4-code" value="US-CA" placeholder="US-CA" required>
                <button type="submit">Test</button>
            </div>
            <div class="response" id="response-subdiv4"></div>
        </form>
    </div>

    <div class="endpoint-section">
        <h2>5. Subdivision with follow_related</h2>
        <h3>POST <span class="endpoint-url">/api/validate/subdivision/follow-related</span></h3>
        <form onsubmit="testEndpoint(event, '/api/validate/subdivision/follow-related', {country: document.getElementById('subdiv5-country').value, code: document.getElementById('subdiv5-code').value})">
            <div class="form-group">
                <label>Country:</label>
                <input type="text" id="subdiv5-country" value="FR" placeholder="FR" required>
            </div>
            <div class="form-group">
                <label>Code:</label>
                <input type="text" id="subdiv5-code" value="FR-40" placeholder="FR-40" required>
                <button type="submit">Test</button>
            </div>
            <div class="response" id="response-subdiv5"></div>
        </form>
    </div>

    <div class="endpoint-section">
        <h2>6. Subdivision with allow_parent_selection</h2>
        <h3>POST <span class="endpoint-url">/api/validate/subdivision/allow-parent</span></h3>
        <form onsubmit="testEndpoint(event, '/api/validate/subdivision/allow-parent', {country: document.getElementById('subdiv6-country').value, code: document.getElementById('subdiv6-code').value})">
            <div class="form-group">
                <label>Country:</label>
                <input type="text" id="subdiv6-country" value="FR" placeholder="FR" required>
            </div>
            <div class="form-group">
                <label>Code:</label>
                <input type="text" id="subdiv6-code" value="FR-ARA" placeholder="FR-ARA" required>
                <button type="submit">Test</button>
            </div>
            <div class="response" id="response-subdiv6"></div>
        </form>
    </div>

    <div class="endpoint-section">
        <h2>7. Multiple Subdivisions</h2>
        <h3>POST <span class="endpoint-url">/api/validate/subdivision/multiple</span></h3>
        <form onsubmit="testEndpoint(event, '/api/validate/subdivision/multiple', {country: document.getElementById('subdiv7-country').value, codes: document.getElementById('subdiv7-codes').value.split(',').map(c => c.trim())})">
            <div class="form-group">
                <label>Country:</label>
                <input type="text" id="subdiv7-country" value="US" placeholder="US" required>
            </div>
            <div class="form-group">
                <label>Codes:</label>
                <input type="text" id="subdiv7-codes" value="US-CA, US-NY, US-TX" placeholder="US-CA, US-NY, US-TX" required>
                <button type="submit">Test</button>
            </div>
            <div class="response" id="response-subdiv7"></div>
        </form>
    </div>

    <div class="endpoint-section">
        <h2>8. Empty Subdivision</h2>
        <h3>POST <span class="endpoint-url">/api/validate/subdivision/empty</span></h3>
        <form onsubmit="testEndpoint(event, '/api/validate/subdivision/empty', {country: document.getElementById('subdiv8-country').value})">
            <div class="form-group">
                <label>Country:</label>
                <input type="text" id="subdiv8-country" value="AQ" placeholder="AQ" required>
                <button type="submit">Test</button>
            </div>
            <div class="response" id="response-subdiv8"></div>
        </form>
    </div>

    <script>
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

