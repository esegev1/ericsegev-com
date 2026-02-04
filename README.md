# ericsegev-com

## Feature Flag: View Mode

The site supports two view modes controlled by a feature flag in `js/config.js`:

```javascript
viewMode: 'home'   // Normal site with projects
viewMode: 'resume' // Card-based resume view
```

To switch views, edit `js/config.js` and change the `viewMode` value.

## Running Locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000
