const SUPABASE_URL = 'https://sdgstfytqxpqdqlfktab.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZ3N0Znl0cXhwcWRxbGZrdGFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMjg2MzUsImV4cCI6MjA1NTkwNDYzNX0.zlONQlkCAWqXBdCnpErUEqeOSIPxa1uv5I0LJHoACrs';

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Smart Image Link Generator</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #6366f1;
      --primary-dark: #4f46e5;
      --primary-light: #e0e7ff;
      --bg: #f8fafc;
      --card-bg: #ffffff;
      --border: #e2e8f0;
      --text: #1e293b;
      --muted: #64748b;
      --success: #10b981;
      --success-light: #d1fae5;
      --danger: #ef4444;
      --danger-light: #fee2e2;
      --shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
      --radius: 16px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      background: var(--bg);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: var(--text);
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      line-height: 1.5;
    }
    
    .container {
      background: var(--card-bg);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: 2.5rem;
      max-width: 480px;
      width: 100%;
      margin: 2rem;
      border: 1px solid var(--border);
      animation: fadeIn 0.8s cubic-bezier(.4,0,.2,1);
      position: relative;
      overflow: hidden;
    }
    
    .container::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, var(--primary), var(--primary-dark));
      border-radius: var(--radius) var(--radius) 0 0;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(30px);}
      to { opacity: 1; transform: none;}
    }
    
    h1 {
      font-size: 2rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 0.5rem;
      letter-spacing: -0.025em;
      background: linear-gradient(90deg, var(--primary), var(--primary-dark));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .subtitle {
      text-align: center;
      color: var(--muted);
      font-size: 1rem;
      font-weight: 400;
      margin-bottom: 2.5rem;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
      position: relative;
    }
    
    .form-group label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
      color: var(--text);
    }
    
    .file-upload {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: var(--primary-light);
      border: 2px dashed var(--primary);
      border-radius: var(--radius);
      padding: 2rem 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-bottom: 1.5rem;
    }
    
    .file-upload:hover {
      background-color: rgba(224, 231, 255, 0.7);
    }
    
    .file-upload-icon {
      width: 48px;
      height: 48px;
      margin-bottom: 1rem;
      color: var(--primary);
    }
    
    .file-label {
      color: var(--primary);
      font-weight: 600;
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
    
    .file-sublabel {
      color: var(--muted);
      font-size: 0.875rem;
    }
    
    #imageInput {
      display: none;
    }
    
    .preview-section {
      display: flex;
      justify-content: center;
      margin-bottom: 1.5rem;
      overflow: hidden;
      border-radius: var(--radius);
      position: relative;
    }
    
    #imagePreview {
      max-width: 100%;
      max-height: 200px;
      border-radius: var(--radius);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
      display: none;
      margin-top: 0.5rem;
      object-fit: contain;
    }
    
    .input-wrapper {
      position: relative;
    }
    
    .input-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--muted);
    }
    
    input[type='text'], input[type='url'] {
      width: 100%;
      padding: 0.9rem 1rem 0.9rem 2.5rem;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      font-size: 1rem;
      background: #fff;
      transition: all 0.2s;
      font-weight: 400;
    }
    
    input[type='text']:focus, input[type='url']:focus {
      border-color: var(--primary);
      outline: none;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
    
    input[type='text']::placeholder, input[type='url']::placeholder {
      color: var(--muted);
      opacity: 0.7;
    }
    
    .btn {
      width: 100%;
      background: linear-gradient(90deg, var(--primary), var(--primary-dark));
      color: #fff;
      border: none;
      border-radius: var(--radius);
      padding: 1rem 0;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
      position: relative;
      overflow: hidden;
    }
    
    .btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(99, 102, 241, 0.3);
    }
    
    .btn:active {
      transform: translateY(1px);
    }
    
    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      color: var(--primary);
      margin: 1rem 0;
      font-weight: 500;
      display: none;
    }
    
    .spinner {
      border: 3px solid rgba(99, 102, 241, 0.1);
      border-radius: 50%;
      border-top: 3px solid var(--primary);
      width: 18px;
      height: 18px;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .message {
      padding: 1rem;
      border-radius: var(--radius);
      margin: 1rem 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      font-weight: 500;
      display: none;
    }
    
    .error {
      background-color: var(--danger-light);
      color: var(--danger);
    }
    
    .success { 
      background-color: var(--success-light);
      color: var(--success);
    }
    
    .result-section {
      margin-top: 2rem;
      background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
      border-radius: var(--radius);
      padding: 1.5rem;
      display: none;
      text-align: center;
      border: 1px solid var(--border);
      animation: fadeIn 0.5s ease;
    }
    
    .result-title {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--text);
    }
    
    .result-link {
      width: 100%;
      padding: 0.8rem 1rem;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      font-size: 0.9rem;
      margin-bottom: 1rem;
      background: #fff;
      color: var(--primary);
      word-break: break-all;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
      transition: all 0.2s;
    }
    
    .result-link:focus {
      border-color: var(--primary);
      outline: none;
    }
    
    .copy-btn {
      background: var(--success);
      color: #fff;
      border: none;
      border-radius: var(--radius);
      padding: 0.8rem 1.5rem;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin: 0 auto;
    }
    
    .copy-btn:hover {
      background: #059669;
      transform: translateY(-1px);
    }
    
    .tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: #fff;
      padding: 0.4rem 0.8rem;
      border-radius: 4px;
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
      opacity: 0;
      transition: opacity 0.2s;
      pointer-events: none;
      white-space: nowrap;
    }
    
    .tooltip.show {
      opacity: 1;
    }
    
    .qrcode-container {
      margin-top: 1.5rem;
      text-align: center;
    }
    
    .qrcode-title {
      font-size: 0.9rem;
      color: var(--muted);
      margin-bottom: 0.5rem;
    }
    
    #qrcode {
      display: inline-block;
      padding: 1rem;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    
    .footer {
      text-align: center;
      color: var(--muted);
      font-size: 0.8rem;
      margin-top: 2rem;
    }
    
    @media (max-width: 600px) {
      .container { 
        padding: 1.5rem; 
        margin: 1rem;
      }
      h1 { font-size: 1.5rem; }
      .subtitle { font-size: 0.9rem; }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Smart Image Link Generator</h1>
    <div class="subtitle">Upload an image, set a destination link, and share your image anywhere!</div>
    
    <form id="uploadForm" autocomplete="off">
      <label for="imageInput" class="file-upload" id="dropzone">
        <svg xmlns="http://www.w3.org/2000/svg" class="file-upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        <div class="file-label">Choose an image or drag and drop</div>
        <div class="file-sublabel">PNG, JPG, GIF up to 5MB</div>
        <input type="file" id="imageInput" accept="image/*" />
      </label>
      
      <div class="preview-section">
        <img id="imagePreview" alt="Preview" />
      </div>
      
      <div class="form-group">
        <label for="destinationLink">Destination URL</label>
        <div class="input-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
          <input type="url" id="destinationLink" placeholder="https://example.com" />
        </div>
      </div>
      
      <div class="form-group">
        <label for="ogTitle">Link Title (optional)</label>
        <div class="input-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
          <input type="text" id="ogTitle" placeholder="Enter title for your link" />
        </div>
      </div>
      
      <div class="form-group">
        <label for="ogDescription">Link Description (optional)</label>
        <div class="input-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="21" y1="6" x2="3" y2="6"></line>
            <line x1="21" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="18" x2="3" y2="18"></line>
          </svg>
          <input type="text" id="ogDescription" placeholder="Enter description for your link" />
        </div>
      </div>
      
      <button type="submit" class="btn" id="generateBtn">Generate Smart Link</button>
      
      <div class="loading" id="loading">
        <div class="spinner"></div>
        <span>Generating your link...</span>
      </div>
      
      <div class="message error" id="error"></div>
      <div class="message success" id="success"></div>
    </form>
    
    <div class="result-section" id="resultSection">
      <div class="result-title">Your Smart Image Link is ready!</div>
      <input type="text" id="generatedLink" class="result-link" readonly />
      <button class="copy-btn" onclick="copyLink()" id="copyBtn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        Copy Link
        <span class="tooltip" id="tooltip">Copied!</span>
      </button>
      
      <div class="qrcode-container">
        <div class="qrcode-title">Or scan this QR code:</div>
        <div id="qrcode"></div>
      </div>
    </div>
    
    <div class="footer">
      Smart Image Link Generator &copy; 2025
    </div>
  </div>
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
  <script>
    let uploadedImageUrl = null;
    let dropzone = document.getElementById('dropzone');
    
    // Handle drag and drop functionality
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
      dropzone.style.backgroundColor = 'rgba(224, 231, 255, 0.8)';
      dropzone.style.borderColor = 'var(--primary-dark)';
    }
    
    function unhighlight() {
      dropzone.style.backgroundColor = '';
      dropzone.style.borderColor = '';
    }
    
    dropzone.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
      const dt = e.dataTransfer;
      const files = dt.files;
      
      if (files && files.length) {
        document.getElementById('imageInput').files = files;
        previewImage(files[0]);
      }
    }
    
    // Handle image preview
    document.getElementById('imageInput').addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        previewImage(file);
      }
    });
    
    function previewImage(file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const preview = document.getElementById('imagePreview');
        preview.src = e.target.result;
        preview.style.display = 'block';
      }
      reader.readAsDataURL(file);
    }
    
    // Handle form submission
    document.getElementById('uploadForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      const imageInput = document.getElementById('imageInput');
      const destinationLink = document.getElementById('destinationLink').value.trim();
      const ogTitle = document.getElementById('ogTitle').value.trim();
      const ogDescription = document.getElementById('ogDescription').value.trim();
      const loading = document.getElementById('loading');
      const error = document.getElementById('error');
      const success = document.getElementById('success');
      const resultSection = document.getElementById('resultSection');
      const generateBtn = document.getElementById('generateBtn');
      
      error.style.display = 'none';
      success.style.display = 'none';
      resultSection.style.display = 'none';
      
      if (!imageInput.files[0]) {
        showError('Please select an image to continue');
        return;
      }
      
      if (!destinationLink) {
        showError('Please enter a destination URL');
        return;
      }
      
      if (!isValidUrl(destinationLink)) {
        showError('Please enter a valid URL including http:// or https://');
        return;
      }
      
      loading.style.display = 'flex';
      generateBtn.disabled = true;
      
      try {
        const formData = new FormData();
        formData.append('image', imageInput.files[0]);
        formData.append('destination', destinationLink);
        formData.append('ogTitle', ogTitle);
        formData.append('ogDescription', ogDescription);
        
        const response = await fetch('/upload', {
          method: 'POST',
          body: formData
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.details || data.error || 'Upload failed');
        }
        
        uploadedImageUrl = data.imageUrl;
        document.getElementById('generatedLink').value = uploadedImageUrl;
        resultSection.style.display = 'block';
        showSuccess('Your link has been generated successfully!');
        
        // Generate QR code
        document.getElementById('qrcode').innerHTML = '';
        new QRCode(document.getElementById('qrcode'), {
          text: uploadedImageUrl,
          width: 128,
          height: 128,
          colorDark: '#1e293b',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        });
        
        // Scroll to result
        resultSection.scrollIntoView({ behavior: 'smooth' });
        
      } catch (err) {
        showError(err.message || 'Failed to generate link. Please try again.');
      } finally {
        loading.style.display = 'none';
        generateBtn.disabled = false;
      }
    });
    
    function copyLink() {
      const linkInput = document.getElementById('generatedLink');
      linkInput.select();
      document.execCommand('copy');
      
      const tooltip = document.getElementById('tooltip');
      tooltip.classList.add('show');
      
      setTimeout(() => {
        tooltip.classList.remove('show');
      }, 2000);
      
      showSuccess('Link copied to clipboard!');
    }
    
    function showError(message) {
      const error = document.getElementById('error');
      error.innerHTML = \`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        \${message}
      \`;
      error.style.display = 'flex';
    }
    
    function showSuccess(message) {
      const success = document.getElementById('success');
      success.innerHTML = \`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        \${message}
      \`;
      success.style.display = 'flex';
    }
    
    function isValidUrl(string) {
      try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
      } catch (_) {
        return false;
      }
    }
  </script>
</body>
</html>`;

async function handleRequest(request) {
  const url = new URL(request.url);
  
  // Serve the HTML file for GET requests
  if (request.method === 'GET') {
    if (url.pathname === '/') {
      return new Response(HTML, {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    // Handle image requests and redirects
    if (url.pathname.startsWith('/i/')) {
      const publicId = url.pathname.slice(3);

      // Get metadata from Supabase by publicId
      const metadataResponse = await fetch(
        `${SUPABASE_URL}/rest/v1/image_links?public_id=eq.${publicId}&select=filename,destination,og_title,og_description`,
        {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          }
        }
      );
      if (!metadataResponse.ok) {
        return new Response('Image not found', { status: 404 });
      }
      const metadata = await metadataResponse.json();
      if (!metadata || metadata.length === 0) {
        return new Response('Image not found', { status: 404 });
      }
      const { filename, destination, og_title, og_description } = metadata[0];
      const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/images/${filename}`;
      const title = og_title || 'Smart Image Link';
      const description = og_description || 'Click the image to visit the link!';

      // Serve an HTML page with Open Graph tags, NO auto-redirect
      return new Response(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta property="og:title" content="${title}" />
          <meta property="og:description" content="${description}" />
          <meta property="og:image" content="${imageUrl}" />
          <meta property="og:url" content="${url.origin}/i/${publicId}" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="${imageUrl}" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <title>${title}</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
          <style>
            :root {
              --primary: #6366f1;
              --primary-dark: #4f46e5;
              --primary-light: #e0e7ff;
              --bg: #0f172a;
              --card-bg: #1e293b;
              --border: #334155;
              --text: #f8fafc;
              --muted: #94a3b8;
              --success: #10b981;
              --success-light: #d1fae5;
              --shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
              --radius: 16px;
            }

            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
              -webkit-tap-highlight-color: transparent;
            }

            html {
              height: -webkit-fill-available;
            }

            body {
              background: var(--bg);
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
              color: var(--text);
              min-height: 100vh;
              min-height: -webkit-fill-available;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 1rem;
              line-height: 1.5;
              overflow-x: hidden;
              position: relative;
            }

            .container {
              max-width: 800px;
              width: 100%;
              text-align: center;
              animation: fadeIn 0.8s cubic-bezier(.4,0,.2,1);
              padding: 0.5rem;
            }

            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: none; }
            }

            .image-container {
              position: relative;
              margin-bottom: 1.5rem;
              border-radius: var(--radius);
              overflow: hidden;
              box-shadow: var(--shadow);
              background: var(--card-bg);
              padding: 0.75rem;
              transition: transform 0.3s ease;
              touch-action: manipulation;
            }

            .image-container:active {
              transform: scale(0.98);
            }

            .image-wrapper {
              position: relative;
              border-radius: calc(var(--radius) - 8px);
              overflow: hidden;
              aspect-ratio: 16/9;
              display: block;
            }

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: calc(var(--radius) - 8px);
              transition: transform 0.3s ease;
              -webkit-user-drag: none;
              user-select: none;
            }

            .overlay {
              position: absolute;
              inset: 0;
              background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7));
              opacity: 0;
              transition: opacity 0.3s ease;
              display: flex;
              align-items: center;
              justify-content: center;
              pointer-events: none;
            }

            .image-container:active .overlay {
              opacity: 1;
            }

            .click-prompt {
              color: white;
              font-size: 1.1rem;
              font-weight: 600;
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
              transform: translateY(20px);
              opacity: 0;
              transition: all 0.3s ease;
            }

            .image-container:active .click-prompt {
              transform: translateY(0);
              opacity: 1;
            }

            .description {
              color: var(--muted);
              font-size: 1rem;
              margin: 1rem 0 1.5rem;
              max-width: 600px;
              margin-left: auto;
              margin-right: auto;
              padding: 0 0.5rem;
            }

            .destination-link {
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              background: var(--primary);
              color: white;
              text-decoration: none;
              padding: 0.8rem 1.5rem;
              border-radius: var(--radius);
              font-weight: 600;
              transition: all 0.3s ease;
              box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
              -webkit-tap-highlight-color: transparent;
              touch-action: manipulation;
              margin: 0 0.5rem;
            }

            .destination-link:active {
              background: var(--primary-dark);
              transform: scale(0.98);
            }

            .destination-link svg {
              width: 20px;
              height: 20px;
              flex-shrink: 0;
            }

            .footer {
              position: fixed;
              bottom: 0.5rem;
              left: 0;
              right: 0;
              text-align: center;
              color: var(--muted);
              font-size: 0.8rem;
              padding: 0.5rem;
              background: linear-gradient(to top, var(--bg), transparent);
            }

            /* Mobile-specific styles */
            @media (max-width: 600px) {
              body {
                padding: 0.5rem;
              }

              .container {
                padding: 0.25rem;
              }

              .image-container {
                margin-bottom: 1rem;
                padding: 0.5rem;
              }

              .description {
                font-size: 0.95rem;
                margin: 0.75rem 0 1.25rem;
              }

              .destination-link {
                padding: 0.7rem 1.2rem;
                font-size: 0.9rem;
                width: calc(100% - 1rem);
                justify-content: center;
              }

              .footer {
                font-size: 0.75rem;
              }
            }

            /* Small mobile devices */
            @media (max-width: 360px) {
              .container {
                padding: 0;
              }

              .image-container {
                padding: 0.25rem;
              }

              .description {
                font-size: 0.9rem;
                margin: 0.5rem 0 1rem;
              }

              .destination-link {
                padding: 0.6rem 1rem;
                font-size: 0.85rem;
              }
            }

            /* Landscape mode */
            @media (max-height: 500px) and (orientation: landscape) {
              body {
                padding: 0.5rem;
              }

              .container {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 0.5rem;
              }

              .image-container {
                margin-bottom: 0;
                flex: 0 0 50%;
                max-width: 50%;
              }

              .description {
                margin: 0 0 0.75rem;
                text-align: left;
              }

              .destination-link {
                margin: 0;
              }

              .footer {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="image-container">
              <a href="${destination}" class="image-wrapper">
                <img src="${imageUrl}" alt="${title}" loading="eager" />
                <div class="overlay">
                  <div class="click-prompt">Tap to visit destination</div>
                </div>
              </a>
            </div>
            <div class="description">${description}</div>
            <a href="${destination}" class="destination-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              Visit Destination
            </a>
          </div>
          <div class="footer">
            Smart Image Link Generator
          </div>
        </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' }
      });
    }

    return new Response('Not found', { status: 404 });
  }

  // Handle image uploads
  if (request.method === 'POST' && url.pathname === '/upload') {
    try {
      const formData = await request.formData();
      const image = formData.get('image');
      const destination = formData.get('destination');
      const ogTitle = formData.get('ogTitle') || '';
      const ogDescription = formData.get('ogDescription') || '';

      if (!image || !destination) {
        return new Response(JSON.stringify({ error: 'Missing image or destination' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Generate a unique publicId and filename
      const ext = image.name.split('.').pop();
      const publicId = `${Date.now()}-${Math.random().toString(36).substring(2)}`;
      const filename = `${publicId}.${ext}`;

      // Upload image to Supabase Storage
      const uploadResponse = await fetch(
        `${SUPABASE_URL}/storage/v1/object/images/${filename}`,
        {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': image.type,
            'x-upsert': 'true'
          },
          body: image.stream ? image.stream() : image
        }
      );

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.text();
        return new Response(JSON.stringify({ error: 'Failed to upload image', details: errorData }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Store metadata in Supabase (publicId, filename, destination, og_title, og_description)
      const metadataResponse = await fetch(
        `${SUPABASE_URL}/rest/v1/image_links`,
        {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({ public_id: publicId, filename, destination, og_title: ogTitle, og_description: ogDescription })
        }
      );

      if (!metadataResponse.ok) {
        const errorData = await metadataResponse.text();
        return new Response(JSON.stringify({ error: 'Failed to store metadata', details: errorData }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Return the image URL (without extension)
      const imageUrl = `${url.origin}/i/${publicId}`;
      return new Response(JSON.stringify({ imageUrl }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Upload failed', details: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  return new Response('Method not allowed', { status: 405 });
}

// For Cloudflare Workers
export default {
  fetch: handleRequest
};

// For Deno Deploy
if (typeof Deno !== 'undefined') {
  Deno.serve(handleRequest);
} 