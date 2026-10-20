export const baseStyles = `
  font-family: sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background-color: #f0f2f5; padding: 2rem; box-sizing: border-box;
  .card { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); width: 100%; max-width: 500px; text-align: center; box-sizing: border-box; }
  .btn { display: inline-block; background: #007bff; color: white; border: none; padding: 0.75rem 1.5rem; font-size: 1rem; border-radius: 4px; cursor: pointer; transition: background 0.2s; text-decoration: none; width: 100%; box-sizing: border-box; margin-bottom: 1rem; text-align: center;}
  .btn:hover { background: #0056b3; }
  .btn-danger { background: #dc3545; padding: 0.4rem 0.8rem; font-size: 0.85rem; width: auto; margin: 0; border: none; border-radius: 4px; color: white; cursor: pointer; }
  .btn-danger:hover { background: #bd2130; }
  h1 { color: #333; margin-bottom: 1.5rem; margin-top: 0; display: flex; justify-content: center; align-items: center; gap: 0.5rem; }
  .badge { background: #6c757d; color: white; font-size: 1rem; padding: 0.2rem 0.6rem; border-radius: 20px; font-weight: bold; }
  .nav-link { display: inline-block; margin-top: 1rem; color: #007bff; text-decoration: none; font-size: 0.9rem; }
  .nav-link:hover { text-decoration: underline; }
  .input-field { width: 100%; padding: 0.75rem; font-size: 1rem; border: 1px solid #ced4da; border-radius: 4px; margin-bottom: 1.5rem; box-sizing: border-box; }
  .pagination-container { display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; margin-bottom: 1rem; }
  .btn-page { background: #e2e8f0; color: #334155; padding: 0.5rem 1rem; text-decoration: none; border-radius: 4px; font-size: 0.9rem; font-weight: 500; }
  .btn-page:hover { background: #cbd5e1; }
  .btn-page.disabled { background: #f1f5f9; color: #94a3b8; pointer-events: none; cursor: not-allowed; }
  .page-info { font-size: 0.9rem; color: #64748b; }
`;

export const htmlWrapper = (title, bodyContent) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>${baseStyles}</style>
</head>
<body>
    <div class="card">
        ${bodyContent}
    </div>
</body>
</html>
`;
