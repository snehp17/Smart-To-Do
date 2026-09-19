function escapeHtml(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function exportTasksToPDF(tasks = [], stats = {}, pet = 'dog') {
  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const remaining = total - completed
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0

  const activeTasks = tasks.filter((t) => !t.completed)
  const completedTasks = tasks.filter((t) => t.completed)

  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    alert('Please allow popups to generate your PDF task report.')
    return
  }

  const categoryIcons = {
    Work: '💼',
    Study: '📚',
    Personal: '🏠',
    Health: '💪',
    Other: '📌',
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ticksy-Tasks-Report-${new Date().toISOString().split('T')[0]}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@600;700&display=swap');

    @page {
      size: A4 portrait;
      margin: 16mm 14mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #2B241E;
      background: #FFFFFF;
      line-height: 1.5;
      padding: 28px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
      border-bottom: 2px solid #EBE4DC;
      margin-bottom: 24px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .brand-icon {
      width: 48px;
      height: 48px;
      background: #8A5A36;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      font-size: 24px;
      font-weight: 900;
      box-shadow: 0 4px 10px rgba(138, 90, 54, 0.2);
    }

    .brand-title {
      font-size: 24px;
      font-weight: 900;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #2B241E;
    }

    .brand-sub {
      font-size: 13px;
      color: #74695E;
      font-weight: 600;
    }

    .meta-info {
      text-align: right;
      font-size: 12px;
      color: #74695E;
    }

    .meta-date {
      font-weight: 800;
      color: #2B241E;
      font-size: 14px;
      margin-bottom: 2px;
    }

    .meta-badge {
      display: inline-block;
      background: #FAF6F0;
      border: 1px solid #E5DEC9;
      padding: 3px 10px;
      border-radius: 999px;
      font-weight: 700;
      font-size: 11px;
      color: #8A5A36;
      margin-top: 4px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 24px;
    }

    .stat-card {
      background: #FAF6F0;
      border: 1px solid #E5DEC9;
      border-radius: 16px;
      padding: 14px 16px;
    }

    .stat-label {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: #74695E;
      margin-bottom: 4px;
    }

    .stat-value {
      font-size: 26px;
      font-weight: 900;
      color: #2B241E;
    }

    .progress-box {
      background: #FAF6F0;
      border: 1px solid #E5DEC9;
      border-radius: 16px;
      padding: 14px 18px;
      margin-bottom: 28px;
    }

    .progress-header {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-weight: 800;
      margin-bottom: 8px;
    }

    .progress-track {
      height: 10px;
      background: #EBE4DC;
      border-radius: 999px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: #8A5A36;
      border-radius: 999px;
      width: ${progress}%;
    }

    .section-title {
      font-size: 15px;
      font-weight: 800;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #2B241E;
      border-bottom: 1.5px solid #F0EAE1;
      padding-bottom: 6px;
    }

    .task-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 24px;
    }

    .task-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      background: #FFFFFF;
      border: 1px solid #EBE4DC;
      border-radius: 12px;
      page-break-inside: avoid;
    }

    .task-left {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
      min-width: 0;
    }

    .checkbox {
      width: 18px;
      height: 18px;
      border: 2px solid #8A5A36;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 900;
      color: white;
      background: white;
      flex-shrink: 0;
    }

    .checkbox.checked {
      background: #8A5A36;
    }

    .task-title {
      font-size: 13px;
      font-weight: 700;
      color: #2B241E;
      word-break: break-word;
    }

    .task-title.completed {
      text-decoration: line-through;
      color: #9E948A;
    }

    .task-tags {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }

    .badge {
      font-size: 11px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .badge-work { background: #E0F2FE; color: #0369A1; }
    .badge-study { background: #FEF3C7; color: #92400E; }
    .badge-personal { background: #F3E8FF; color: #6B21A8; }
    .badge-health { background: #DCFCE7; color: #166534; }
    .badge-other { background: #F1F5F9; color: #475569; }

    .badge-high { background: #FEE2E2; color: #991B1B; }
    .badge-medium { background: #FEF3C7; color: #92400E; }
    .badge-low { background: #DCFCE7; color: #166534; }

    .time-tag {
      font-size: 11px;
      font-weight: 700;
      color: #74695E;
      background: #FAF6F0;
      border: 1px solid #E5DEC9;
      padding: 2px 8px;
      border-radius: 8px;
      font-family: 'JetBrains Mono', monospace;
    }

    .footer {
      margin-top: 36px;
      padding-top: 14px;
      border-top: 1.5px solid #EBE4DC;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #74695E;
      font-weight: 600;
    }

    .action-bar {
      position: fixed;
      top: 16px;
      right: 16px;
      background: #2B241E;
      color: white;
      padding: 10px 18px;
      border-radius: 999px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.25);
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      font-weight: 800;
      font-size: 13px;
      z-index: 1000;
      transition: transform 0.2s;
    }

    .action-bar:hover {
      transform: scale(1.05);
    }

    @media print {
      body {
        padding: 0;
      }
      .action-bar {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="action-bar" onclick="window.print()">
    <span>🖨️ Click to Save / Print PDF</span>
  </div>

  <div class="header">
    <div class="brand">
      <div class="brand-icon">✓</div>
      <div>
        <div class="brand-title">TICKSY</div>
        <div class="brand-sub">Daily Productivity & Schedule Report</div>
      </div>
    </div>
    <div class="meta-info">
      <div class="meta-date">${dateStr}</div>
      <div class="meta-badge">Companion: ${pet === 'cat' ? 'Cat 🐱' : 'Dog 🐶'}</div>
    </div>
  </div>

  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-label">Total Goals</div>
      <div class="stat-value">${total}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Completed</div>
      <div class="stat-value">${completed}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Remaining</div>
      <div class="stat-value">${remaining}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Success Rate</div>
      <div class="stat-value">${progress}%</div>
    </div>
  </div>

  <div class="progress-box">
    <div class="progress-header">
      <span>Progress Status</span>
      <span>${completed} of ${total} Goals Achieved (${progress}%)</span>
    </div>
    <div class="progress-track">
      <div class="progress-fill"></div>
    </div>
  </div>

  <div class="section-title">
    <span>📋</span> Active Goals (${activeTasks.length})
  </div>
  <ul class="task-list">
    ${
      activeTasks.length === 0
        ? '<li style="font-size: 13px; color: #74695E; font-style: italic; padding: 12px; background: #FAF6F0; border-radius: 10px;">All caught up! No pending goals.</li>'
        : activeTasks
            .map(
              (t) => `
      <li class="task-item">
        <div class="task-left">
          <div class="checkbox"></div>
          <span class="task-title">${escapeHtml(t.title)}</span>
        </div>
        <div class="task-tags">
          <span class="badge badge-${(t.category || 'other').toLowerCase()}">${categoryIcons[t.category] || '📌'} ${t.category || 'Other'}</span>
          <span class="badge badge-${(t.priority || 'medium').toLowerCase()}">${t.priority || 'Medium'}</span>
          ${t.dueTime ? `<span class="time-tag">${t.dueTime}</span>` : ''}
        </div>
      </li>
    `
            )
            .join('')
    }
  </ul>

  ${
    completedTasks.length > 0
      ? `
    <div class="section-title">
      <span>✅</span> Completed Goals (${completedTasks.length})
    </div>
    <ul class="task-list">
      ${completedTasks
        .map(
          (t) => `
        <li class="task-item">
          <div class="task-left">
            <div class="checkbox checked">✓</div>
            <span class="task-title completed">${escapeHtml(t.title)}</span>
          </div>
          <div class="task-tags">
            <span class="badge badge-${(t.category || 'other').toLowerCase()}">${categoryIcons[t.category] || '📌'} ${t.category || 'Other'}</span>
            <span class="badge badge-${(t.priority || 'medium').toLowerCase()}">${t.priority || 'Medium'}</span>
            ${t.dueTime ? `<span class="time-tag">${t.dueTime}</span>` : ''}
          </div>
        </li>
      `
        )
        .join('')}
    </ul>
  `
      : ''
  }

  <div class="footer">
    <span>Generated by Ticksy • Plan it. Do it. Check it off.</span>
    <span>Printed on ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
  </div>

  <script>
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        window.print();
      }, 400);
    });
  </script>
</body>
</html>`

  printWindow.document.open()
  printWindow.document.write(html)
  printWindow.document.close()
}
