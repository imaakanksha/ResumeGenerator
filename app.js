// ===== STATE =====
const state = {
    personal: {}, summary: '', experience: [], education: [],
    skills: [], projects: [], certifications: [], jdKeywords: []
};

// ===== NAVIGATION =====
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('view-' + btn.dataset.view).classList.add('active');
        if (btn.dataset.view === 'preview') renderPreview();
    });
});

// ===== SECTION TOGGLES =====
document.querySelectorAll('.section-header').forEach(h => {
    h.addEventListener('click', () => {
        const body = h.nextElementSibling;
        body.classList.toggle('open');
        h.querySelector('.chevron').style.transform = body.classList.contains('open') ? 'rotate(180deg)' : '';
    });
});

// ===== TOAST =====
function toast(msg, type = 'success') {
    const el = document.createElement('div');
    el.className = 'toast ' + type;
    const icons = { success: '✓', error: '✗', info: 'ℹ' };
    el.innerHTML = `<span class="toast-icon">${icons[type] || icons.success}</span><span>${msg}</span><div class="toast-progress"></div>`;
    document.getElementById('toast-container').appendChild(el);
    setTimeout(() => el.remove(), 3200);
}

// ===== COLLECT DATA =====
function collect() {
    state.personal = {
        name: document.getElementById('inp-name').value,
        email: document.getElementById('inp-email').value,
        phone: document.getElementById('inp-phone').value,
        location: document.getElementById('inp-location').value,
        linkedin: document.getElementById('inp-linkedin').value,
        github: document.getElementById('inp-github').value
    };
    state.summary = document.getElementById('inp-summary').value;
    state.experience = collectList('experience-list', ['title','company','start','end','bullets']);
    state.education = collectList('education-list', ['degree','school','year','gpa']);
    state.skills = collectList('skills-list', ['category','items']);
    state.projects = collectList('projects-list', ['name','tech','bullets']);
    state.certifications = collectList('certs-list', ['name','issuer','year']);
}

function collectList(containerId, fields) {
    const items = [];
    document.getElementById(containerId).querySelectorAll('.list-item').forEach(el => {
        const obj = {};
        fields.forEach(f => {
            const inp = el.querySelector(`[data-field="${f}"]`);
            if (inp) obj[f] = inp.value;
        });
        items.push(obj);
    });
    return items;
}

// ===== ADD EXPERIENCE =====
document.getElementById('btn-add-exp').addEventListener('click', () => {
    const html = `<div class="list-item" draggable="true">
        <div class="drag-handle"><span></span><span></span><span></span></div>
        <button class="btn-duplicate" title="Duplicate" onclick="duplicateItem(this)"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"/><path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"/></svg></button>
        <button class="btn-remove" onclick="this.parentElement.remove();updateMetrics()">×</button>
        <div class="form-grid">
            <div class="form-group"><label>Job Title</label><input type="text" data-field="title" placeholder="Software Engineer"></div>
            <div class="form-group"><label>Company</label><input type="text" data-field="company" placeholder="Google"></div>
            <div class="form-group"><label>Start Date</label><input type="text" data-field="start" placeholder="Jan 2022"></div>
            <div class="form-group"><label>End Date</label><input type="text" data-field="end" placeholder="Present"></div>
            <div class="form-group full"><label>Bullet Points (one per line)</label><textarea data-field="bullets" rows="4" placeholder="• Led development of microservices architecture&#10;• Improved system performance by 40%"></textarea></div>
        </div>
    </div>`;
    document.getElementById('experience-list').insertAdjacentHTML('beforeend', html);
    applyTextareaStyle(); initDragDrop('experience-list');
});

// ===== ADD EDUCATION =====
document.getElementById('btn-add-edu').addEventListener('click', () => {
    const html = `<div class="list-item" draggable="true">
        <div class="drag-handle"><span></span><span></span><span></span></div>
        <button class="btn-duplicate" title="Duplicate" onclick="duplicateItem(this)"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"/><path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"/></svg></button>
        <button class="btn-remove" onclick="this.parentElement.remove();updateMetrics()">&times;</button>
        <div class="form-grid">
            <div class="form-group"><label>Degree</label><input type="text" data-field="degree" placeholder="B.S. Computer Science"></div>
            <div class="form-group"><label>School</label><input type="text" data-field="school" placeholder="MIT"></div>
            <div class="form-group"><label>Year</label><input type="text" data-field="year" placeholder="2018 - 2022"></div>
            <div class="form-group"><label>GPA (optional)</label><input type="text" data-field="gpa" placeholder="3.9/4.0"></div>
        </div>
    </div>`;
    document.getElementById('education-list').insertAdjacentHTML('beforeend', html);
    initDragDrop('education-list');
});

// ===== ADD SKILLS =====
document.getElementById('btn-add-skill').addEventListener('click', () => {
    const html = `<div class="list-item" draggable="true">
        <div class="drag-handle"><span></span><span></span><span></span></div>
        <button class="btn-duplicate" title="Duplicate" onclick="duplicateItem(this)"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"/><path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"/></svg></button>
        <button class="btn-remove" onclick="this.parentElement.remove();updateMetrics()">&times;</button>
        <div class="form-grid">
            <div class="form-group"><label>Category</label><input type="text" data-field="category" placeholder="Programming Languages"></div>
            <div class="form-group"><label>Skills (comma-separated)</label><input type="text" data-field="items" placeholder="Python, Java, JavaScript, Go"></div>
        </div>
    </div>`;
    document.getElementById('skills-list').insertAdjacentHTML('beforeend', html);
    initDragDrop('skills-list');
});

// ===== ADD PROJECT =====
document.getElementById('btn-add-proj').addEventListener('click', () => {
    const html = `<div class="list-item" draggable="true">
        <div class="drag-handle"><span></span><span></span><span></span></div>
        <button class="btn-duplicate" title="Duplicate" onclick="duplicateItem(this)"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"/><path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"/></svg></button>
        <button class="btn-remove" onclick="this.parentElement.remove();updateMetrics()">&times;</button>
        <div class="form-grid">
            <div class="form-group"><label>Project Name</label><input type="text" data-field="name" placeholder="E-Commerce Platform"></div>
            <div class="form-group"><label>Technologies</label><input type="text" data-field="tech" placeholder="React, Node.js, MongoDB"></div>
            <div class="form-group full"><label>Description (one point per line)</label><textarea data-field="bullets" rows="3" placeholder="• Built a full-stack e-commerce platform&#10;• Integrated Stripe payment processing"></textarea></div>
        </div>
    </div>`;
    document.getElementById('projects-list').insertAdjacentHTML('beforeend', html);
    applyTextareaStyle(); initDragDrop('projects-list');
});

// ===== ADD CERTIFICATION =====
document.getElementById('btn-add-cert').addEventListener('click', () => {
    const html = `<div class="list-item" draggable="true">
        <div class="drag-handle"><span></span><span></span><span></span></div>
        <button class="btn-duplicate" title="Duplicate" onclick="duplicateItem(this)"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"/><path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"/></svg></button>
        <button class="btn-remove" onclick="this.parentElement.remove();updateMetrics()">&times;</button>
        <div class="form-grid">
            <div class="form-group"><label>Certification Name</label><input type="text" data-field="name" placeholder="AWS Solutions Architect"></div>
            <div class="form-group"><label>Issuer</label><input type="text" data-field="issuer" placeholder="Amazon Web Services"></div>
            <div class="form-group"><label>Year</label><input type="text" data-field="year" placeholder="2023"></div>
        </div>
    </div>`;
    document.getElementById('certs-list').insertAdjacentHTML('beforeend', html);
    initDragDrop('certs-list');
});

function applyTextareaStyle() {
    document.querySelectorAll('.list-item textarea').forEach(t => {
        t.style.cssText = 'width:100%;padding:9px 12px;background:rgba(30,30,50,0.6);border:1px solid rgba(255,255,255,0.06);border-radius:6px;color:#e8e8f0;font-family:Inter,sans-serif;font-size:0.85rem;resize:vertical;line-height:1.6;';
    });
}

// ===== JD PARSER =====
document.getElementById('btn-parse-jd').addEventListener('click', () => {
    const jd = document.getElementById('jd-input').value.trim();
    if (!jd) { toast('Please paste a job description first', 'error'); return; }
    const keywords = extractKeywords(jd);
    state.jdKeywords = keywords;
    const container = document.getElementById('keywords-list');
    container.innerHTML = keywords.map(k => `<span class="keyword-tag">${k}</span>`).join('');
    document.getElementById('jd-keywords').style.display = 'block';
    toast(`Extracted ${keywords.length} keywords`);
});

function extractKeywords(text) {
    const techSkills = ['python','java','javascript','typescript','react','angular','vue','node','express','django','flask','spring','docker','kubernetes','aws','azure','gcp','sql','nosql','mongodb','postgresql','mysql','redis','git','ci/cd','jenkins','terraform','ansible','linux','agile','scrum','rest','graphql','microservices','machine learning','deep learning','nlp','tensorflow','pytorch','pandas','numpy','html','css','sass','webpack','babel','jest','selenium','cypress','jira','confluence','figma','tableau','power bi','spark','hadoop','kafka','rabbitmq','elasticsearch','nginx','apache','c\\+\\+','c#','.net','ruby','rails','go','rust','swift','kotlin','flutter','react native','ios','android','devops','sre','data engineering','data science','cloud','serverless','lambda','api','sdk','oauth','jwt','security','networking','tcp/ip','http','websocket','grpc','protobuf'];
    const softSkills = ['leadership','communication','problem-solving','teamwork','collaboration','analytical','strategic','mentoring','cross-functional','stakeholder','project management','time management','critical thinking','presentation','negotiation','decision-making'];
    const found = new Set();
    const lower = text.toLowerCase();
    [...techSkills, ...softSkills].forEach(s => {
        if (lower.includes(s.replace('\\+', '+').replace('\\', ''))) found.add(s.replace('\\+','+').replace('\\',''));
    });
    // Extract capitalized terms/acronyms
    const acronyms = text.match(/\b[A-Z]{2,6}\b/g) || [];
    acronyms.forEach(a => { if (!['THE','AND','FOR','WITH','THIS','THAT','FROM','HAVE','WILL','YOUR','ABOUT','BEEN','EACH','MAKE'].includes(a)) found.add(a); });
    // Years of experience
    const yoe = text.match(/(\d+)\+?\s*years?\s*(of\s*)?experience/gi);
    if (yoe) yoe.forEach(y => found.add(y.trim()));
    return [...found].slice(0, 40);
}

// ===== PREVIEW RENDERER =====
function renderPreview() {
    collect();
    const template = document.getElementById('template-select').value;
    const previewEl = document.getElementById('resume-preview');
    previewEl.className = 'resume-paper' + (template !== 'professional' ? ' template-' + template : '');
    const p = state.personal;
    const contactParts = [p.email, p.phone, p.location, p.linkedin, p.github].filter(Boolean);
    let html = '';
    if (p.name) html += `<h1>${esc(p.name)}</h1>`;
    if (contactParts.length) html += `<div class="contact-line">${contactParts.map(c => esc(c)).join(' | ')}</div>`;
    if (state.summary) { html += `<h2>Professional Summary</h2><p style="font-size:10.5pt;margin-bottom:8px">${esc(state.summary)}</p>`; }
    if (state.experience.length) {
        html += '<h2>Experience</h2>';
        state.experience.forEach(e => {
            html += `<h3>${esc(e.title || '')}</h3>`;
            html += `<div class="job-meta"><span>${esc(e.company || '')}</span><span>${esc(e.start || '')} – ${esc(e.end || '')}</span></div>`;
            if (e.bullets) html += '<ul>' + e.bullets.split('\n').filter(Boolean).map(b => `<li>${esc(b.replace(/^[•\-]\s*/, ''))}</li>`).join('') + '</ul>';
        });
    }
    if (state.education.length) {
        html += '<h2>Education</h2>';
        state.education.forEach(e => {
            html += `<h3>${esc(e.degree || '')}</h3>`;
            html += `<div class="job-meta"><span>${esc(e.school || '')}</span><span>${esc(e.year || '')}${e.gpa ? ' | GPA: ' + esc(e.gpa) : ''}</span></div>`;
        });
    }
    if (state.skills.length) {
        html += '<h2>Technical Skills</h2>';
        state.skills.forEach(s => { html += `<div class="skills-row"><strong>${esc(s.category || '')}:</strong> ${esc(s.items || '')}</div>`; });
    }
    if (state.projects.length) {
        html += '<h2>Projects</h2>';
        state.projects.forEach(pr => {
            html += `<h3>${esc(pr.name || '')} ${pr.tech ? '<span style="font-weight:normal;font-size:10pt;color:#555">| ' + esc(pr.tech) + '</span>' : ''}</h3>`;
            if (pr.bullets) html += '<ul>' + pr.bullets.split('\n').filter(Boolean).map(b => `<li>${esc(b.replace(/^[•\-]\s*/, ''))}</li>`).join('') + '</ul>';
        });
    }
    if (state.certifications.length) {
        html += '<h2>Certifications</h2>';
        state.certifications.forEach(c => { html += `<div style="font-size:10.5pt;margin-bottom:3px"><strong>${esc(c.name || '')}</strong> – ${esc(c.issuer || '')} (${esc(c.year || '')})</div>`; });
    }
    document.getElementById('resume-preview').innerHTML = html || '<p style="color:#999;text-align:center;padding:40px">Fill in the resume editor to see your preview here.</p>';
}

function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

// ===== ATS ANALYZER =====
document.getElementById('btn-analyze').addEventListener('click', runATS);

function runATS() {
    collect();
    const jd = document.getElementById('jd-input').value.trim();
    if (!jd) { toast('Please paste a job description first', 'error'); return; }
    if (!state.personal.name) { toast('Please fill in your resume details', 'error'); return; }
    if (!state.jdKeywords.length) { state.jdKeywords = extractKeywords(jd); }

    const resumeText = buildResumeText().toLowerCase();
    // 1. Keyword match
    let matched = [], missing = [];
    state.jdKeywords.forEach(k => {
        if (resumeText.includes(k.toLowerCase())) matched.push(k); else missing.push(k);
    });
    const kwScore = state.jdKeywords.length ? Math.round((matched.length / state.jdKeywords.length) * 100) : 0;

    // 2. Format score
    let fmtPts = 0, fmtTotal = 5, fmtChecks = [];
    const checks = [
        [!!state.personal.name && !!state.personal.email, 'Contact information present'],
        [!!state.summary, 'Professional summary included'],
        [state.experience.length > 0, 'Work experience listed'],
        [state.education.length > 0, 'Education section present'],
        [state.skills.length > 0, 'Skills section present']
    ];
    checks.forEach(([ok, label]) => { if (ok) fmtPts++; fmtChecks.push({ ok, label }); });
    const fmtScore = Math.round((fmtPts / fmtTotal) * 100);

    // 3. Impact words
    const impactWords = ['achieved','improved','increased','reduced','led','managed','developed','designed','implemented','optimized','delivered','launched','created','built','streamlined','automated','mentored','scaled','resolved','collaborated','spearheaded','orchestrated','transformed','pioneered'];
    let impFound = [];
    impactWords.forEach(w => { if (resumeText.includes(w)) impFound.push(w); });
    const impScore = Math.min(100, Math.round((impFound.length / 8) * 100));

    // 4. Section completeness
    let secPts = 0, secTotal = 7, secChecks = [];
    const sChecks = [
        [!!state.personal.name, 'Full Name'], [!!state.personal.email, 'Email'],
        [!!state.summary, 'Summary'], [state.experience.length > 0, 'Experience'],
        [state.education.length > 0, 'Education'], [state.skills.length > 0, 'Skills'],
        [state.projects.length > 0 || state.certifications.length > 0, 'Projects/Certs']
    ];
    sChecks.forEach(([ok, label]) => { if (ok) secPts++; secChecks.push({ ok, label }); });
    const secScore = Math.round((secPts / secTotal) * 100);

    // Overall
    const overall = Math.round(kwScore * 0.4 + fmtScore * 0.2 + impScore * 0.15 + secScore * 0.25);

    // Animate score
    animateScore(overall);
    if (overall >= 75) setTimeout(launchConfetti, 600);

    // Update cards
    document.getElementById('kw-score').textContent = kwScore + '%';
    document.getElementById('kw-details').innerHTML =
        '<div style="margin-bottom:8px"><strong style="color:#34d399">Matched:</strong> ' + (matched.length ? matched.map(k => `<span class="keyword-tag matched">${k}</span>`).join(' ') : 'None') + '</div>' +
        '<div><strong style="color:#f87171">Missing:</strong> ' + (missing.length ? missing.map(k => `<span class="keyword-tag missing">${k}</span>`).join(' ') : 'None') + '</div>';

    document.getElementById('fmt-score').textContent = fmtScore + '%';
    document.getElementById('fmt-details').innerHTML = fmtChecks.map(c => `<div class="match-item"><span class="${c.ok ? 'match-icon-yes' : 'match-icon-no'}">${c.ok ? '✓' : '✗'}</span> ${c.label}</div>`).join('');

    document.getElementById('imp-score').textContent = impScore + '%';
    document.getElementById('imp-details').innerHTML = impFound.length ? '<strong>Found:</strong> ' + impFound.join(', ') : '<span style="color:var(--accent-yellow)">Add action verbs like: achieved, improved, led, developed</span>';

    document.getElementById('sec-score').textContent = secScore + '%';
    document.getElementById('sec-details').innerHTML = secChecks.map(c => `<div class="match-item"><span class="${c.ok ? 'match-icon-yes' : 'match-icon-no'}">${c.ok ? '✓' : '✗'}</span> ${c.label}</div>`).join('');

    // Suggestions
    const suggestions = [];
    if (missing.length > 3) suggestions.push(`Add these missing keywords to your resume: ${missing.slice(0, 5).join(', ')}`);
    if (!state.summary) suggestions.push('Add a professional summary tailored to the job description.');
    if (impFound.length < 5) suggestions.push('Use more action/impact verbs: achieved, improved, led, optimized, delivered.');
    if (state.experience.length === 0) suggestions.push('Add your work experience with quantifiable achievements.');
    if (state.skills.length === 0) suggestions.push('Add a skills section matching the job requirements.');
    if (state.projects.length === 0) suggestions.push('Add relevant projects to strengthen your application.');
    if (kwScore < 60) suggestions.push('Your keyword match is low. Mirror the job description language more closely.');
    if (overall >= 80) suggestions.push('Great score! Fine-tune by adding any remaining missing keywords.');

    document.getElementById('suggestions-list').innerHTML = suggestions.map(s => `<li>${s}</li>`).join('');
    document.getElementById('ats-details').style.display = 'grid';
    document.getElementById('ats-suggestions').style.display = 'block';

    const desc = overall >= 80 ? 'Excellent! Your resume is well-optimized for this role.' :
                 overall >= 60 ? 'Good start, but there\'s room for improvement.' :
                 'Your resume needs significant optimization for this role.';
    document.getElementById('score-description').textContent = desc;
    toast('ATS analysis complete!');
}

function buildResumeText() {
    const parts = [state.summary];
    state.experience.forEach(e => parts.push(e.title, e.company, e.bullets));
    state.education.forEach(e => parts.push(e.degree, e.school));
    state.skills.forEach(s => parts.push(s.category, s.items));
    state.projects.forEach(p => parts.push(p.name, p.tech, p.bullets));
    state.certifications.forEach(c => parts.push(c.name, c.issuer));
    return parts.filter(Boolean).join(' ');
}

function animateScore(target) {
    const el = document.getElementById('score-number');
    const arc = document.getElementById('score-arc');
    const circumference = 2 * Math.PI * 85;
    let current = 0;
    const step = () => {
        if (current <= target) {
            el.textContent = current;
            arc.style.strokeDashoffset = circumference - (circumference * current / 100);
            current++;
            requestAnimationFrame(step);
        }
    };
    step();
}

// ===== EXPORT LATEX =====
document.getElementById('btn-export-tex').addEventListener('click', () => {
    collect();
    if (!state.personal.name) { toast('Fill in your resume first', 'error'); return; }
    const tex = generateLaTeX();
    downloadFile(state.personal.name.replace(/\s+/g, '_') + '_Resume.tex', tex, 'application/x-tex');
    toast('LaTeX file exported! Upload to Overleaf.');
});

function generateLaTeX() {
    const p = state.personal;
    let tex = `\\documentclass[11pt,a4paper]{article}
\\usepackage[margin=0.7in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{titlesec}
\\usepackage[utf8]{inputenc}

\\titleformat{\\section}{\\large\\bfseries\\uppercase}{}{0em}{}[\\titlerule]
\\titlespacing{\\section}{0pt}{10pt}{6pt}
\\setlist[itemize]{nosep,left=0pt..1.5em}
\\pagestyle{empty}
\\hypersetup{colorlinks=true,linkcolor=blue,urlcolor=blue}

\\begin{document}

% Header
\\begin{center}
{\\LARGE\\bfseries ${texEsc(p.name || 'Your Name')}}\\\\[4pt]
`;
    const contact = [p.email, p.phone, p.location].filter(Boolean).map(texEsc);
    if (p.linkedin) contact.push(`\\href{https://${p.linkedin.replace(/^https?:\/\//, '')}}{LinkedIn}`);
    if (p.github) contact.push(`\\href{https://${p.github.replace(/^https?:\/\//, '')}}{GitHub}`);
    tex += contact.join(' $|$ ') + '\n\\end{center}\n\n';

    if (state.summary) {
        tex += `\\section{Professional Summary}\n${texEsc(state.summary)}\n\n`;
    }
    if (state.experience.length) {
        tex += '\\section{Experience}\n';
        state.experience.forEach(e => {
            tex += `\\textbf{${texEsc(e.title || '')}} \\hfill ${texEsc(e.start || '')} -- ${texEsc(e.end || '')}\\\\
\\textit{${texEsc(e.company || '')}}
\\begin{itemize}\n`;
            if (e.bullets) e.bullets.split('\n').filter(Boolean).forEach(b => { tex += `  \\item ${texEsc(b.replace(/^[•\-]\s*/, ''))}\n`; });
            tex += '\\end{itemize}\n\\vspace{4pt}\n';
        });
        tex += '\n';
    }
    if (state.education.length) {
        tex += '\\section{Education}\n';
        state.education.forEach(e => {
            tex += `\\textbf{${texEsc(e.degree || '')}} \\hfill ${texEsc(e.year || '')}\\\\
\\textit{${texEsc(e.school || '')}}${e.gpa ? ' \\hfill GPA: ' + texEsc(e.gpa) : ''}\n\\vspace{4pt}\n`;
        });
        tex += '\n';
    }
    if (state.skills.length) {
        tex += '\\section{Technical Skills}\n\\begin{itemize}\n';
        state.skills.forEach(s => { tex += `  \\item \\textbf{${texEsc(s.category || '')}:} ${texEsc(s.items || '')}\n`; });
        tex += '\\end{itemize}\n\n';
    }
    if (state.projects.length) {
        tex += '\\section{Projects}\n';
        state.projects.forEach(pr => {
            tex += `\\textbf{${texEsc(pr.name || '')}}${pr.tech ? ' \\textit{(' + texEsc(pr.tech) + ')}' : ''}\n\\begin{itemize}\n`;
            if (pr.bullets) pr.bullets.split('\n').filter(Boolean).forEach(b => { tex += `  \\item ${texEsc(b.replace(/^[•\-]\s*/, ''))}\n`; });
            tex += '\\end{itemize}\n\\vspace{4pt}\n';
        });
        tex += '\n';
    }
    if (state.certifications.length) {
        tex += '\\section{Certifications}\n\\begin{itemize}\n';
        state.certifications.forEach(c => { tex += `  \\item \\textbf{${texEsc(c.name || '')}} -- ${texEsc(c.issuer || '')} (${texEsc(c.year || '')})\n`; });
        tex += '\\end{itemize}\n\n';
    }
    tex += '\\end{document}';
    return tex;
}

function texEsc(s) {
    return (s || '').replace(/\\/g, '\\textbackslash{}')
        .replace(/[&%$#_{}]/g, m => '\\' + m)
        .replace(/~/g, '\\textasciitilde{}')
        .replace(/\^/g, '\\textasciicircum{}');
}

// ===== EXPORT PDF =====
document.getElementById('btn-export-pdf').addEventListener('click', () => {
    collect();
    if (!state.personal.name) { toast('Fill in your resume first', 'error'); return; }
    // Switch to preview, render, then print
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('nav-preview').classList.add('active');
    document.getElementById('view-preview').classList.add('active');
    renderPreview();
    setTimeout(() => {
        const printContent = document.getElementById('resume-preview').innerHTML;
        const win = window.open('', '_blank');
        win.document.write(`<!DOCTYPE html><html><head><title>${esc(state.personal.name)} Resume</title>
        <style>body{font-family:'Times New Roman',serif;font-size:11pt;line-height:1.4;margin:20mm 18mm;color:#1a1a1a}
        h1{font-size:20pt;text-align:center;margin-bottom:4px}
        .contact-line{text-align:center;font-size:9pt;color:#444;margin-bottom:12px}
        h2{font-size:11pt;text-transform:uppercase;letter-spacing:1px;border-bottom:1.5px solid #111;padding-bottom:2px;margin:14px 0 6px}
        h3{font-size:11pt;font-weight:bold;margin-bottom:1px}
        .job-meta{display:flex;justify-content:space-between;font-style:italic;font-size:10pt;color:#555;margin-bottom:4px}
        ul{margin:2px 0 8px 18px}li{font-size:10.5pt;margin-bottom:2px}
        .skills-row{margin-bottom:3px;font-size:10.5pt}</style></head><body>${printContent}</body></html>`);
        win.document.close();
        win.print();
    }, 300);
    toast('PDF export ready — use print dialog to save');
});

function downloadFile(name, content, type) {
    const blob = new Blob([content], { type });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    URL.revokeObjectURL(a.href);
}

// ===== THEME TOGGLE =====
const themeBtn = document.getElementById('btn-theme');
const themeIcon = document.getElementById('icon-theme');
function setTheme(light) {
    document.body.classList.toggle('light', light);
    themeIcon.innerHTML = light
        ? '<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>'
        : '<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>';
    localStorage.setItem('rf-theme', light ? 'light' : 'dark');
}
themeBtn.addEventListener('click', () => setTheme(!document.body.classList.contains('light')));
if (localStorage.getItem('rf-theme') === 'light') setTheme(true);

// ===== AUTO-SAVE =====
let saveTimer = null;
function autoSave() {
    collect();
    const data = { personal: state.personal, summary: state.summary, experience: state.experience, education: state.education, skills: state.skills, projects: state.projects, certifications: state.certifications, jdText: document.getElementById('jd-input').value };
    localStorage.setItem('rf-data', JSON.stringify(data));
    localStorage.setItem('rf-save-ts', Date.now().toString());
    updateFooterTime();
    const ind = document.getElementById('save-indicator');
    ind.classList.add('visible');
    setTimeout(() => ind.classList.remove('visible'), 2000);
}
function scheduleAutoSave() { clearTimeout(saveTimer); saveTimer = setTimeout(autoSave, 1500); }
document.addEventListener('input', scheduleAutoSave);

// ===== PROGRESS BAR =====
function updateProgress() {
    let filled = 0, total = 10;
    const p = state.personal || {};
    if (p.name) filled++;
    if (p.email) filled++;
    if (p.phone) filled++;
    if (p.location) filled++;
    if (state.summary || document.getElementById('inp-summary').value) filled++;
    if (document.getElementById('experience-list').querySelectorAll('.list-item').length > 0) {
        const first = document.getElementById('experience-list').querySelector('[data-field="title"]');
        if (first && first.value) filled++;
    }
    if (document.getElementById('education-list').querySelectorAll('.list-item').length > 0) {
        const first = document.getElementById('education-list').querySelector('[data-field="degree"]');
        if (first && first.value) filled++;
    }
    if (document.getElementById('skills-list').querySelectorAll('.list-item').length > 0) {
        const first = document.getElementById('skills-list').querySelector('[data-field="items"]');
        if (first && first.value) filled++;
    }
    if (document.getElementById('projects-list').querySelectorAll('.list-item').length > 0) {
        const first = document.getElementById('projects-list').querySelector('[data-field="name"]');
        if (first && first.value) filled++;
    }
    if (document.getElementById('jd-input').value.trim()) filled++;
    const pct = Math.round((filled / total) * 100);
    document.getElementById('progress-bar').style.width = pct + '%';
}
document.addEventListener('input', updateProgress);
setInterval(updateProgress, 3000);

// ===== CONFETTI =====
function launchConfetti() {
    const colors = ['#6366f1','#06b6d4','#10b981','#f59e0b','#ec4899','#ef4444','#818cf8'];
    for (let i = 0; i < 60; i++) {
        const el = document.createElement('div');
        el.className = 'confetti-piece';
        el.style.left = Math.random() * 100 + 'vw';
        el.style.top = -10 + 'px';
        el.style.background = colors[Math.floor(Math.random() * colors.length)];
        el.style.animationDelay = Math.random() * 0.8 + 's';
        el.style.width = (6 + Math.random() * 8) + 'px';
        el.style.height = (6 + Math.random() * 8) + 'px';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3500);
    }
}
// Hook confetti into ATS — patch animateScore
const _origAnimateScore = animateScore;
function animateScoreWithConfetti(target) {
    _origAnimateScore(target);
    if (target >= 75) setTimeout(launchConfetti, 600);
}
// Override the runATS call
const origRunATS = runATS;

// ===== KEYBOARD SHORTCUTS =====
document.getElementById('btn-shortcuts').addEventListener('click', () => {
    document.getElementById('modal-shortcuts').classList.add('active');
});
document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case '1': e.preventDefault(); document.getElementById('nav-editor').click(); break;
            case '2': e.preventDefault(); document.getElementById('nav-preview').click(); break;
            case '3': e.preventDefault(); document.getElementById('nav-ats').click(); break;
            case 's': e.preventDefault(); autoSave(); toast('Resume saved!'); break;
            case 'd': e.preventDefault(); themeBtn.click(); break;
            case 'l': e.preventDefault(); document.getElementById('btn-export-tex').click(); break;
            case '/': e.preventDefault(); document.getElementById('modal-shortcuts').classList.toggle('active'); break;
        }
    }
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    }
});

// ===== EXPORT JSON =====
document.getElementById('btn-export-json').addEventListener('click', () => {
    collect();
    const data = { personal: state.personal, summary: state.summary, experience: state.experience, education: state.education, skills: state.skills, projects: state.projects, certifications: state.certifications };
    downloadFile((state.personal.name || 'resume').replace(/\s+/g, '_') + '.json', JSON.stringify(data, null, 2), 'application/json');
    toast('JSON exported!');
});

// ===== IMPORT JSON =====
document.getElementById('btn-import-json').addEventListener('click', () => {
    document.getElementById('modal-import').classList.add('active');
});
document.getElementById('btn-do-import').addEventListener('click', () => {
    try {
        const data = JSON.parse(document.getElementById('import-json-input').value);
        localStorage.setItem('rf-data', JSON.stringify(data));
        document.getElementById('modal-import').classList.remove('active');
        toast('Resume imported! Reloading...');
        setTimeout(() => location.reload(), 800);
    } catch(e) { toast('Invalid JSON data', 'error'); }
});

// ===== RESTORE SAVED DATA =====
function restoreSavedData() {
    const saved = localStorage.getItem('rf-data');
    if (!saved) return false;
    try {
        const data = JSON.parse(saved);
        if (data.personal) {
            if (data.personal.name) document.getElementById('inp-name').value = data.personal.name;
            if (data.personal.email) document.getElementById('inp-email').value = data.personal.email;
            if (data.personal.phone) document.getElementById('inp-phone').value = data.personal.phone;
            if (data.personal.location) document.getElementById('inp-location').value = data.personal.location;
            if (data.personal.linkedin) document.getElementById('inp-linkedin').value = data.personal.linkedin;
            if (data.personal.github) document.getElementById('inp-github').value = data.personal.github;
        }
        if (data.summary) document.getElementById('inp-summary').value = data.summary;
        if (data.jdText) document.getElementById('jd-input').value = data.jdText;
        // Restore dynamic lists
        function restoreList(btnId, listId, items, fields) {
            document.getElementById(listId).innerHTML = '';
            (items || []).forEach(item => {
                document.getElementById(btnId).click();
                const lastItem = document.getElementById(listId).lastElementChild;
                fields.forEach(f => {
                    const inp = lastItem.querySelector(`[data-field="${f}"]`);
                    if (inp && item[f]) inp.value = item[f];
                });
            });
            if (!items || !items.length) document.getElementById(btnId).click();
        }
        restoreList('btn-add-exp', 'experience-list', data.experience, ['title','company','start','end','bullets']);
        restoreList('btn-add-edu', 'education-list', data.education, ['degree','school','year','gpa']);
        restoreList('btn-add-skill', 'skills-list', data.skills, ['category','items']);
        restoreList('btn-add-proj', 'projects-list', data.projects, ['name','tech','bullets']);
        restoreList('btn-add-cert', 'certs-list', data.certifications, ['name','issuer','year']);
        return true;
    } catch(e) { return false; }
}

// ===== CHAR COUNTS =====
function addCharCount(el, max) {
    const counter = document.createElement('div');
    counter.className = 'char-count';
    el.parentNode.appendChild(counter);
    function update() {
        const len = el.value.length;
        counter.textContent = len + (max ? ' / ' + max : '') + ' chars';
        counter.classList.toggle('warn', max && len > max);
    }
    el.addEventListener('input', update);
    update();
}
addCharCount(document.getElementById('inp-summary'), 500);
addCharCount(document.getElementById('jd-input'), 0);

// ===== DRAG & DROP =====
function initDragDrop(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.querySelectorAll('.list-item').forEach(item => {
        item.removeEventListener('dragstart', handleDragStart);
        item.removeEventListener('dragend', handleDragEnd);
        item.removeEventListener('dragover', handleDragOver);
        item.removeEventListener('drop', handleDrop);
        item.removeEventListener('dragleave', handleDragLeave);
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragleave', handleDragLeave);
    });
}
let draggedItem = null;
function handleDragStart(e) { draggedItem = this; this.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; }
function handleDragEnd() { this.classList.remove('dragging'); document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over')); draggedItem = null; }
function handleDragOver(e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; if (this !== draggedItem) this.classList.add('drag-over'); }
function handleDragLeave() { this.classList.remove('drag-over'); }
function handleDrop(e) {
    e.preventDefault(); this.classList.remove('drag-over');
    if (draggedItem && this !== draggedItem && this.parentNode === draggedItem.parentNode) {
        const parent = this.parentNode;
        const items = [...parent.querySelectorAll('.list-item')];
        const fromIdx = items.indexOf(draggedItem), toIdx = items.indexOf(this);
        if (fromIdx < toIdx) parent.insertBefore(draggedItem, this.nextSibling);
        else parent.insertBefore(draggedItem, this);
        toast('Item reordered', 'info');
    }
}

// ===== DUPLICATE ITEM =====
function duplicateItem(btn) {
    const item = btn.closest('.list-item');
    const clone = item.cloneNode(true);
    item.querySelectorAll('input, textarea').forEach((inp, i) => {
        const cloneInp = clone.querySelectorAll('input, textarea')[i];
        if (cloneInp) cloneInp.value = inp.value;
    });
    item.parentNode.insertBefore(clone, item.nextSibling);
    const containerId = item.parentNode.id;
    if (containerId) initDragDrop(containerId);
    applyTextareaStyle();
    toast('Item duplicated', 'info');
    updateMetrics();
}

// ===== METRICS =====
function updateMetrics() {
    collect();
    const text = buildResumeText();
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const readingMin = Math.max(1, Math.ceil(words / 200));
    let bullets = 0;
    state.experience.forEach(e => { if (e.bullets) bullets += e.bullets.split('\n').filter(Boolean).length; });
    state.projects.forEach(p => { if (p.bullets) bullets += p.bullets.split('\n').filter(Boolean).length; });
    let skillCount = 0;
    state.skills.forEach(s => { if (s.items) skillCount += s.items.split(',').filter(i => i.trim()).length; });
    const sections = [state.summary, state.experience.length, state.education.length, state.skills.length, state.projects.length, state.certifications.length].filter(Boolean).length;
    document.getElementById('metric-words').textContent = words;
    document.getElementById('metric-sections').textContent = sections + '/6';
    document.getElementById('metric-reading').textContent = '~' + readingMin + ' min';
    document.getElementById('metric-bullets').textContent = bullets;
    document.getElementById('metric-skills').textContent = skillCount;
}
document.addEventListener('input', updateMetrics);

// ===== RESET =====
document.getElementById('btn-reset').addEventListener('click', () => {
    document.getElementById('modal-reset').classList.add('active');
});
document.getElementById('btn-confirm-reset').addEventListener('click', () => {
    localStorage.removeItem('rf-data');
    document.getElementById('modal-reset').classList.remove('active');
    toast('All data cleared. Reloading...', 'info');
    setTimeout(() => location.reload(), 800);
});

// ===== WRITING TIPS =====
const writingTips = [
    { title: '💡 Quantify Your Impact', text: 'Use <strong>numbers and percentages</strong> to demonstrate results. Instead of "Improved performance", write "Improved API response time by <strong>40%</strong>, reducing latency from 800ms to 480ms."' },
    { title: '🎯 Mirror the JD', text: 'Use the <strong>exact phrasing</strong> from the job description in your resume. If they say "cross-functional collaboration", use that exact term — not "working with other teams."' },
    { title: '⚡ Start with Action Verbs', text: 'Begin each bullet with a <strong>power verb</strong>: Led, Architected, Optimized, Spearheaded, Delivered, Orchestrated. Avoid passive phrases like "Was responsible for."' },
    { title: '📊 Use the STAR Method', text: 'Structure bullets as: <strong>Situation → Task → Action → Result</strong>. This framework ensures every bullet tells a compelling, measurable story.' },
    { title: '🔑 ATS Keywords Matter', text: 'Include <strong>technical skills as exact keywords</strong> — "Python" not "programming", "AWS" not "cloud". ATS systems match literal strings.' },
    { title: '📝 Keep It Concise', text: 'Aim for <strong>3-5 bullets per role</strong>. Each should be 1-2 lines max. Recruiters spend ~7 seconds on initial resume scans.' },
];
let currentTipIdx = parseInt(localStorage.getItem('rf-tip-idx') || '0') % writingTips.length;
function showWritingTip() {
    const tip = writingTips[currentTipIdx];
    const container = document.querySelector('.panel-resume .panel-body');
    if (!container) return;
    const existing = container.querySelector('.tips-panel');
    if (existing) existing.remove();
    const el = document.createElement('div');
    el.className = 'tips-panel';
    el.innerHTML = `<div class="tips-panel-header"><h4>${tip.title}</h4><button class="tip-dismiss" onclick="this.closest('.tips-panel').remove()" title="Dismiss">×</button></div><div class="tip-content">${tip.text}</div>`;
    container.insertBefore(el, container.firstChild);
}
function nextTip() {
    currentTipIdx = (currentTipIdx + 1) % writingTips.length;
    localStorage.setItem('rf-tip-idx', currentTipIdx);
    showWritingTip();
}
setInterval(nextTip, 60000);

// ===== FOOTER LAST SAVED =====
function updateFooterTime() {
    const ts = localStorage.getItem('rf-save-ts');
    if (ts) {
        const diff = Math.round((Date.now() - parseInt(ts)) / 1000);
        let txt;
        if (diff < 10) txt = 'Saved just now';
        else if (diff < 60) txt = 'Saved ' + diff + 's ago';
        else if (diff < 3600) txt = 'Saved ' + Math.floor(diff / 60) + 'm ago';
        else txt = 'Saved ' + Math.floor(diff / 3600) + 'h ago';
        document.getElementById('footer-last-saved').textContent = txt;
    }
}
setInterval(updateFooterTime, 10000);

// ===== INIT =====
if (!restoreSavedData()) {
    document.getElementById('btn-add-exp').click();
    document.getElementById('btn-add-edu').click();
    document.getElementById('btn-add-skill').click();
    document.getElementById('btn-add-proj').click();
    document.getElementById('btn-add-cert').click();
}
updateProgress();
updateMetrics();
showWritingTip();
updateFooterTime();
['experience-list','education-list','skills-list','projects-list','certs-list'].forEach(initDragDrop);

// ===== COMMAND PALETTE (Ctrl+K) =====
const commands = [
    { name: 'Switch to Editor', shortcut: 'Ctrl+1', action: () => document.getElementById('nav-editor').click(), icon: '✏️' },
    { name: 'Switch to Preview', shortcut: 'Ctrl+2', action: () => document.getElementById('nav-preview').click(), icon: '👁️' },
    { name: 'Switch to ATS Score', shortcut: 'Ctrl+3', action: () => document.getElementById('nav-ats').click(), icon: '✅' },
    { name: 'Switch to Cover Letter', shortcut: '', action: () => document.getElementById('nav-coverletter').click(), icon: '📄' },
    { name: 'Export PDF', shortcut: 'Ctrl+P', action: () => document.getElementById('btn-export-pdf').click(), icon: '📥' },
    { name: 'Export LaTeX', shortcut: 'Ctrl+L', action: () => document.getElementById('btn-export-tex').click(), icon: '📝' },
    { name: 'Export JSON', shortcut: '', action: () => document.getElementById('btn-export-json').click(), icon: '💾' },
    { name: 'Import JSON', shortcut: '', action: () => document.getElementById('btn-import-json').click(), icon: '📂' },
    { name: 'Copy as Plain Text', shortcut: '', action: () => document.getElementById('btn-copy-text').click(), icon: '📋' },
    { name: 'Toggle Theme', shortcut: 'Ctrl+D', action: () => themeBtn.click(), icon: '🌗' },
    { name: 'Toggle Split Preview', shortcut: '', action: () => document.getElementById('btn-split-preview').click(), icon: '⬜' },
    { name: 'Toggle Focus Mode', shortcut: 'F11', action: () => document.getElementById('btn-fullscreen').click(), icon: '🔳' },
    { name: 'Version History', shortcut: '', action: () => document.getElementById('btn-versions').click(), icon: '🕐' },
    { name: 'Run ATS Analysis', shortcut: '', action: () => { document.getElementById('nav-ats').click(); setTimeout(() => document.getElementById('btn-analyze').click(), 200); }, icon: '🎯' },
    { name: 'Save Resume', shortcut: 'Ctrl+S', action: () => { autoSave(); toast('Resume saved!'); }, icon: '💾' },
    { name: 'Reset All Data', shortcut: '', action: () => document.getElementById('btn-reset').click(), icon: '🗑️' },
    { name: 'Keyboard Shortcuts', shortcut: 'Ctrl+/', action: () => document.getElementById('modal-shortcuts').classList.add('active'), icon: '⌨️' },
    { name: 'Add Experience', shortcut: '', action: () => { document.getElementById('nav-editor').click(); document.getElementById('btn-add-exp').click(); }, icon: '💼' },
    { name: 'Add Education', shortcut: '', action: () => { document.getElementById('nav-editor').click(); document.getElementById('btn-add-edu').click(); }, icon: '🎓' },
    { name: 'Add Skill Category', shortcut: '', action: () => { document.getElementById('nav-editor').click(); document.getElementById('btn-add-skill').click(); }, icon: '⚡' },
    { name: 'Add Project', shortcut: '', action: () => { document.getElementById('nav-editor').click(); document.getElementById('btn-add-proj').click(); }, icon: '🚀' },
    { name: 'Generate Cover Letter', shortcut: '', action: () => { document.getElementById('nav-coverletter').click(); setTimeout(() => document.getElementById('btn-generate-cl').click(), 200); }, icon: '✨' },
];

let cmdIdx = 0;
const cmdOverlay = document.getElementById('command-palette');
const cmdInput = document.getElementById('command-input');
const cmdResults = document.getElementById('command-results');

function openCommandPalette() {
    cmdOverlay.classList.add('active');
    cmdInput.value = '';
    cmdIdx = 0;
    renderCommands(commands);
    setTimeout(() => cmdInput.focus(), 50);
}
function closeCommandPalette() { cmdOverlay.classList.remove('active'); }

function renderCommands(list) {
    cmdResults.innerHTML = list.map((c, i) => `<div class="command-item${i === cmdIdx ? ' active' : ''}" data-idx="${i}">
        <span>${c.icon}</span><span>${c.name}</span>${c.shortcut ? `<span class="cmd-shortcut">${c.shortcut}</span>` : ''}
    </div>`).join('');
    cmdResults.querySelectorAll('.command-item').forEach(el => {
        el.addEventListener('click', () => { list[parseInt(el.dataset.idx)].action(); closeCommandPalette(); });
        el.addEventListener('mouseenter', () => {
            cmdResults.querySelectorAll('.command-item').forEach(e => e.classList.remove('active'));
            el.classList.add('active');
            cmdIdx = parseInt(el.dataset.idx);
        });
    });
}

cmdInput.addEventListener('input', () => {
    const q = cmdInput.value.toLowerCase();
    const filtered = commands.filter(c => c.name.toLowerCase().includes(q));
    cmdIdx = 0;
    renderCommands(filtered);
});

cmdInput.addEventListener('keydown', e => {
    const items = cmdResults.querySelectorAll('.command-item');
    if (e.key === 'ArrowDown') { e.preventDefault(); cmdIdx = Math.min(cmdIdx + 1, items.length - 1); items.forEach((el, i) => el.classList.toggle('active', i === cmdIdx)); items[cmdIdx]?.scrollIntoView({ block: 'nearest' }); }
    if (e.key === 'ArrowUp') { e.preventDefault(); cmdIdx = Math.max(cmdIdx - 1, 0); items.forEach((el, i) => el.classList.toggle('active', i === cmdIdx)); items[cmdIdx]?.scrollIntoView({ block: 'nearest' }); }
    if (e.key === 'Enter' && items[cmdIdx]) { items[cmdIdx].click(); }
});

cmdOverlay.addEventListener('click', e => { if (e.target === cmdOverlay) closeCommandPalette(); });
document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); cmdOverlay.classList.contains('active') ? closeCommandPalette() : openCommandPalette(); }
});

// ===== VERSION HISTORY =====
document.getElementById('btn-versions').addEventListener('click', () => {
    document.getElementById('modal-versions').classList.add('active');
    renderVersions();
});

function getVersions() {
    try { return JSON.parse(localStorage.getItem('rf-versions') || '[]'); } catch { return []; }
}

document.getElementById('btn-save-version').addEventListener('click', () => {
    collect();
    const versions = getVersions();
    const data = { personal: state.personal, summary: state.summary, experience: state.experience, education: state.education, skills: state.skills, projects: state.projects, certifications: state.certifications };
    const wordCount = buildResumeText().trim().split(/\s+/).filter(Boolean).length;
    versions.unshift({ ts: Date.now(), data, wordCount, sections: [state.summary, state.experience.length, state.education.length, state.skills.length, state.projects.length, state.certifications.length].filter(Boolean).length });
    if (versions.length > 20) versions.length = 20;
    localStorage.setItem('rf-versions', JSON.stringify(versions));
    toast('Version saved!');
    renderVersions();
});

document.getElementById('btn-clear-versions').addEventListener('click', () => {
    localStorage.removeItem('rf-versions');
    renderVersions();
    toast('Version history cleared', 'info');
});

function renderVersions() {
    const versions = getVersions();
    const el = document.getElementById('versions-list');
    if (!versions.length) { el.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:30px">No saved versions yet. Click "Save Current Version" to create one.</p>'; return; }
    el.innerHTML = versions.map((v, i) => {
        const d = new Date(v.ts);
        const timeStr = d.toLocaleString();
        return `<div class="version-card"><div class="version-info"><div class="version-ts">${timeStr}</div><div class="version-meta">${v.wordCount || '?'} words · ${v.sections || '?'}/6 sections</div></div><span class="version-badge">${i === 0 ? 'Latest' : 'v' + (versions.length - i)}</span><button class="btn-restore" onclick="restoreVersion(${i})">Restore</button></div>`;
    }).join('');
}

window.restoreVersion = function(idx) {
    const versions = getVersions();
    if (!versions[idx]) return;
    localStorage.setItem('rf-data', JSON.stringify(versions[idx].data));
    document.getElementById('modal-versions').classList.remove('active');
    toast('Version restored! Reloading...', 'info');
    setTimeout(() => location.reload(), 600);
};

// ===== COVER LETTER GENERATOR =====
document.getElementById('btn-generate-cl').addEventListener('click', () => {
    collect();
    const company = document.getElementById('cl-company').value || 'your company';
    const role = document.getElementById('cl-role').value || 'the open position';
    const manager = document.getElementById('cl-manager').value;
    const tone = document.getElementById('cl-tone').value;
    const p = state.personal;
    const jd = document.getElementById('jd-input').value.trim();

    const greeting = manager ? `Dear ${manager},` : 'Dear Hiring Manager,';
    const skills = state.skills.map(s => s.items).filter(Boolean).join(', ');
    const expYears = state.experience.length > 0 ? state.experience.length + '+' : 'several';
    const topExp = state.experience[0];
    const topProj = state.projects[0];

    let body = '';
    if (tone === 'enthusiastic') {
        body = `I am thrilled to apply for the ${role} role at ${company}! With ${expYears} years of professional experience and a passion for delivering impactful solutions, I am confident I would be an excellent addition to your team.\n\n`;
    } else if (tone === 'concise') {
        body = `I am writing to express my interest in the ${role} position at ${company}. My background in ${skills ? skills.split(',').slice(0, 3).join(', ') : 'software development'} makes me a strong fit for this role.\n\n`;
    } else {
        body = `I am writing to express my strong interest in the ${role} position at ${company}. With ${expYears} years of experience in the field and a proven track record of delivering results, I believe I would be a valuable asset to your organization.\n\n`;
    }

    if (topExp) {
        body += `In my role as ${topExp.title || 'a professional'} at ${topExp.company || 'my previous company'}, I ${topExp.bullets ? topExp.bullets.split('\n')[0].replace(/^[•\-]\s*/, '').toLowerCase() : 'contributed significantly to key initiatives'}. `;
    }
    if (skills) {
        body += `My technical expertise spans ${skills.split(',').slice(0, 6).join(', ')}, which aligns well with the requirements outlined in the job description.\n\n`;
    }
    if (topProj) {
        body += `Additionally, I developed ${topProj.name || 'a significant project'}${topProj.tech ? ' using ' + topProj.tech : ''}, demonstrating my ability to deliver end-to-end solutions.\n\n`;
    }
    if (jd) {
        const jdKeywords = extractKeywords(jd).slice(0, 5);
        if (jdKeywords.length) body += `I noticed your team values expertise in ${jdKeywords.join(', ')}, areas where I have substantial hands-on experience.\n\n`;
    }
    body += `I am eager to bring my skills and enthusiasm to ${company} and contribute to your team's continued success. I look forward to the opportunity to discuss how my background aligns with your needs.\n\nThank you for considering my application.`;

    document.getElementById('cl-body').value = body;
    renderCoverLetter();
    toast('Cover letter generated!');
});

function renderCoverLetter() {
    const p = state.personal || {};
    const company = document.getElementById('cl-company').value;
    const manager = document.getElementById('cl-manager').value;
    const body = document.getElementById('cl-body').value;
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const greeting = manager ? `Dear ${manager},` : 'Dear Hiring Manager,';

    let html = `<div class="cl-header"><strong>${esc(p.name || 'Your Name')}</strong><br>${[p.email, p.phone, p.location].filter(Boolean).map(esc).join(' | ')}</div>`;
    html += `<div class="cl-date">${today}</div>`;
    html += `<div class="cl-greeting">${esc(greeting)}</div>`;
    body.split('\n\n').filter(Boolean).forEach(para => { html += `<div class="cl-paragraph">${esc(para)}</div>`; });
    html += `<div class="cl-closing">Sincerely,</div>`;
    html += `<div class="cl-signature">${esc(p.name || 'Your Name')}</div>`;
    document.getElementById('cl-preview').innerHTML = html;
}

document.getElementById('cl-body')?.addEventListener('input', renderCoverLetter);
document.getElementById('cl-company')?.addEventListener('input', renderCoverLetter);
document.getElementById('cl-manager')?.addEventListener('input', renderCoverLetter);

// ===== SPLIT PREVIEW =====
document.getElementById('btn-split-preview').addEventListener('click', () => {
    const active = document.body.classList.toggle('split-preview');
    if (active) {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById('nav-editor').classList.add('active');
        document.getElementById('view-editor').classList.add('active');
        document.getElementById('view-preview').classList.add('active');
        renderPreview();
        toast('Split preview enabled', 'info');
        // Live update preview on input
        document.addEventListener('input', splitPreviewUpdate);
    } else {
        document.removeEventListener('input', splitPreviewUpdate);
        document.getElementById('view-preview').classList.remove('active');
        toast('Split preview disabled', 'info');
    }
});
function splitPreviewUpdate() { if (document.body.classList.contains('split-preview')) renderPreview(); }

// ===== COLOR THEME FOR RESUME =====
let resumeAccentColor = '#2563eb';
document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        resumeAccentColor = swatch.dataset.color;
        const paper = document.getElementById('resume-preview');
        paper.style.setProperty('--resume-accent', resumeAccentColor);
        // Apply to modern template headings dynamically
        document.querySelectorAll('.resume-paper h2, .resume-paper.template-modern h1').forEach(el => {
            if (document.getElementById('template-select').value === 'modern') el.style.color = resumeAccentColor;
        });
        if (document.getElementById('template-select').value === 'modern') {
            document.querySelectorAll('.resume-paper.template-modern h2').forEach(el => el.style.borderBottomColor = resumeAccentColor);
        }
        renderPreview();
        toast('Accent color updated', 'info');
    });
});

// ===== COPY AS PLAIN TEXT =====
document.getElementById('btn-copy-text').addEventListener('click', () => {
    collect();
    const p = state.personal;
    let text = (p.name || '') + '\n';
    text += [p.email, p.phone, p.location, p.linkedin, p.github].filter(Boolean).join(' | ') + '\n\n';
    if (state.summary) text += 'PROFESSIONAL SUMMARY\n' + state.summary + '\n\n';
    if (state.experience.length) {
        text += 'EXPERIENCE\n';
        state.experience.forEach(e => {
            text += `${e.title || ''} | ${e.company || ''} | ${e.start || ''} - ${e.end || ''}\n`;
            if (e.bullets) e.bullets.split('\n').filter(Boolean).forEach(b => { text += '  • ' + b.replace(/^[•\-]\s*/, '') + '\n'; });
            text += '\n';
        });
    }
    if (state.education.length) {
        text += 'EDUCATION\n';
        state.education.forEach(e => { text += `${e.degree || ''} | ${e.school || ''} | ${e.year || ''}${e.gpa ? ' | GPA: ' + e.gpa : ''}\n`; });
        text += '\n';
    }
    if (state.skills.length) {
        text += 'SKILLS\n';
        state.skills.forEach(s => { text += `${s.category || ''}: ${s.items || ''}\n`; });
        text += '\n';
    }
    if (state.projects.length) {
        text += 'PROJECTS\n';
        state.projects.forEach(pr => {
            text += `${pr.name || ''}${pr.tech ? ' (' + pr.tech + ')' : ''}\n`;
            if (pr.bullets) pr.bullets.split('\n').filter(Boolean).forEach(b => { text += '  • ' + b.replace(/^[•\-]\s*/, '') + '\n'; });
            text += '\n';
        });
    }
    if (state.certifications.length) {
        text += 'CERTIFICATIONS\n';
        state.certifications.forEach(c => { text += `${c.name || ''} - ${c.issuer || ''} (${c.year || ''})\n`; });
    }
    navigator.clipboard.writeText(text.trim()).then(() => toast('Copied to clipboard!')).catch(() => toast('Copy failed', 'error'));
});

// ===== UNDO / REDO =====
const undoStack = [];
const redoStack = [];
let lastSnapshot = '';

function takeSnapshot() {
    collect();
    const snap = JSON.stringify({ personal: state.personal, summary: state.summary, experience: state.experience, education: state.education, skills: state.skills, projects: state.projects, certifications: state.certifications });
    if (snap !== lastSnapshot) {
        undoStack.push(lastSnapshot);
        if (undoStack.length > 30) undoStack.shift();
        redoStack.length = 0;
        lastSnapshot = snap;
    }
}

function applySnapshot(snap) {
    if (!snap) return;
    const data = JSON.parse(snap);
    localStorage.setItem('rf-data', JSON.stringify(data));
    location.reload();
}

document.getElementById('btn-undo').addEventListener('click', () => {
    if (!undoStack.length) { toast('Nothing to undo', 'info'); return; }
    collect();
    redoStack.push(JSON.stringify({ personal: state.personal, summary: state.summary, experience: state.experience, education: state.education, skills: state.skills, projects: state.projects, certifications: state.certifications }));
    const prev = undoStack.pop();
    lastSnapshot = prev;
    toast('Undoing...', 'info');
    applySnapshot(prev);
});

document.getElementById('btn-redo').addEventListener('click', () => {
    if (!redoStack.length) { toast('Nothing to redo', 'info'); return; }
    undoStack.push(lastSnapshot);
    const next = redoStack.pop();
    lastSnapshot = next;
    toast('Redoing...', 'info');
    applySnapshot(next);
});

// Take snapshots on significant actions
let snapshotTimer = null;
document.addEventListener('input', () => { clearTimeout(snapshotTimer); snapshotTimer = setTimeout(takeSnapshot, 3000); });
// Initial snapshot
collect();
lastSnapshot = JSON.stringify({ personal: state.personal, summary: state.summary, experience: state.experience, education: state.education, skills: state.skills, projects: state.projects, certifications: state.certifications });

// ===== FULLSCREEN FOCUS MODE =====
document.getElementById('btn-fullscreen').addEventListener('click', () => {
    const active = document.body.classList.toggle('focus-mode');
    toast(active ? 'Focus mode — hover top/bottom to show controls' : 'Focus mode off', 'info');
});

// ===== SECTION STRENGTH INDICATORS =====
function updateStrengthMeters() {
    collect();
    const meters = {
        'section-personal': (() => {
            const p = state.personal;
            let score = 0;
            if (p.name) score += 25; if (p.email) score += 25; if (p.phone) score += 15;
            if (p.location) score += 15; if (p.linkedin) score += 10; if (p.github) score += 10;
            return score;
        })(),
        'section-summary': (() => {
            const s = document.getElementById('inp-summary').value;
            if (!s) return 0;
            let score = Math.min(50, s.length / 4);
            if (s.length > 100) score += 25;
            if (s.length > 200) score += 25;
            return Math.min(100, Math.round(score));
        })(),
        'section-experience': (() => {
            if (!state.experience.length) return 0;
            let score = Math.min(40, state.experience.length * 20);
            state.experience.forEach(e => { if (e.bullets && e.bullets.split('\n').filter(Boolean).length >= 3) score += 15; });
            return Math.min(100, score);
        })(),
        'section-education': (() => {
            if (!state.education.length) return 0;
            let score = 50;
            state.education.forEach(e => { if (e.degree) score += 15; if (e.school) score += 15; if (e.year) score += 10; if (e.gpa) score += 10; });
            return Math.min(100, score);
        })(),
        'section-skills': (() => {
            if (!state.skills.length) return 0;
            let totalSkills = 0;
            state.skills.forEach(s => { if (s.items) totalSkills += s.items.split(',').filter(i => i.trim()).length; });
            return Math.min(100, totalSkills * 10);
        })(),
        'section-projects': (() => {
            if (!state.projects.length) return 0;
            let score = Math.min(40, state.projects.length * 20);
            state.projects.forEach(p => { if (p.tech) score += 10; if (p.bullets) score += 15; });
            return Math.min(100, score);
        })(),
        'section-certifications': (() => {
            if (!state.certifications.length) return 0;
            return Math.min(100, state.certifications.length * 33);
        })()
    };

    Object.entries(meters).forEach(([sectionId, score]) => {
        const section = document.getElementById(sectionId);
        if (!section) return;
        const header = section.querySelector('.section-header');
        let meter = header.querySelector('.section-strength');
        if (!meter) {
            meter = document.createElement('div');
            meter.className = 'section-strength';
            meter.innerHTML = '<div class="strength-bar"><div class="strength-fill"></div></div><span class="strength-label"></span>';
            const chevron = header.querySelector('.chevron');
            header.insertBefore(meter, chevron);
        }
        const fill = meter.querySelector('.strength-fill');
        const label = meter.querySelector('.strength-label');
        fill.style.width = score + '%';
        fill.style.background = score >= 70 ? 'var(--accent-green)' : score >= 40 ? 'var(--accent-yellow)' : 'var(--accent-red)';
        label.textContent = score + '%';
        label.style.color = score >= 70 ? 'var(--accent-green)' : score >= 40 ? 'var(--accent-yellow)' : 'var(--accent-red)';
    });
}
document.addEventListener('input', () => { clearTimeout(window._strengthTimer); window._strengthTimer = setTimeout(updateStrengthMeters, 500); });
updateStrengthMeters();

// ===== ONBOARDING TOUR =====
const tourSteps = [
    { icon: '🚀', title: 'Welcome to ResumeForge v3!', text: 'Build ATS-optimized resumes with real-time scoring, keyword analysis, cover letter generation, and Overleaf LaTeX export.' },
    { icon: '📝', title: 'Smart Editor', text: 'Fill in your details in the Editor tab. Each section has a strength meter showing completeness. Drag & drop to reorder items.' },
    { icon: '🎯', title: 'ATS Analysis', text: 'Paste a job description, then run ATS analysis to see your keyword match, format score, and get actionable recommendations.' },
    { icon: '📄', title: 'Cover Letter Generator', text: 'Auto-generate tailored cover letters based on your resume data and the job description. Choose from multiple tones.' },
    { icon: '⌨️', title: 'Power User Features', text: 'Press Ctrl+K for the command palette, Ctrl+S to save, or use the split preview mode for live editing. Version history lets you restore past snapshots.' },
    { icon: '✨', title: 'You\'re All Set!', text: 'Start building your perfect resume. Use the color picker and templates to customize your output. Good luck!' }
];
let tourStep = 0;

function showTourStep() {
    const step = tourSteps[tourStep];
    document.getElementById('onboarding-content').innerHTML = `<span class="ob-icon">${step.icon}</span><h2>${step.title}</h2><p>${step.text}</p>`;
    document.getElementById('onboarding-dots').innerHTML = tourSteps.map((_, i) => `<div class="onboarding-dot${i === tourStep ? ' active' : ''}"></div>`).join('');
    document.getElementById('onboarding-next').textContent = tourStep === tourSteps.length - 1 ? 'Get Started →' : 'Next →';
}

document.getElementById('onboarding-next').addEventListener('click', () => {
    tourStep++;
    if (tourStep >= tourSteps.length) {
        document.getElementById('onboarding-overlay').classList.remove('active');
        localStorage.setItem('rf-onboarded', '1');
    } else { showTourStep(); }
});

document.getElementById('onboarding-skip').addEventListener('click', () => {
    document.getElementById('onboarding-overlay').classList.remove('active');
    localStorage.setItem('rf-onboarded', '1');
});

// Show onboarding for first-time users
if (!localStorage.getItem('rf-onboarded')) {
    tourStep = 0;
    showTourStep();
    document.getElementById('onboarding-overlay').classList.add('active');
}

// ===== COVER LETTER NAV UPDATE =====
// Make cover letter tab render preview on switch
const origNavHandler = () => {};
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.dataset.view === 'coverletter') { collect(); renderCoverLetter(); }
        // Disable split preview when switching views
        if (document.body.classList.contains('split-preview') && btn.dataset.view !== 'editor') {
            document.body.classList.remove('split-preview');
        }
    });
});
