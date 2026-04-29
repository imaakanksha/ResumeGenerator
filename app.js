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
    el.textContent = msg;
    document.getElementById('toast-container').appendChild(el);
    setTimeout(() => el.remove(), 3000);
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
    const html = `<div class="list-item">
        <button class="btn-remove" onclick="this.parentElement.remove()">&times;</button>
        <div class="form-grid">
            <div class="form-group"><label>Job Title</label><input type="text" data-field="title" placeholder="Software Engineer"></div>
            <div class="form-group"><label>Company</label><input type="text" data-field="company" placeholder="Google"></div>
            <div class="form-group"><label>Start Date</label><input type="text" data-field="start" placeholder="Jan 2022"></div>
            <div class="form-group"><label>End Date</label><input type="text" data-field="end" placeholder="Present"></div>
            <div class="form-group full"><label>Bullet Points (one per line)</label><textarea data-field="bullets" rows="4" placeholder="• Led development of microservices architecture&#10;• Improved system performance by 40%"></textarea></div>
        </div>
    </div>`;
    document.getElementById('experience-list').insertAdjacentHTML('beforeend', html);
    applyTextareaStyle();
});

// ===== ADD EDUCATION =====
document.getElementById('btn-add-edu').addEventListener('click', () => {
    const html = `<div class="list-item">
        <button class="btn-remove" onclick="this.parentElement.remove()">&times;</button>
        <div class="form-grid">
            <div class="form-group"><label>Degree</label><input type="text" data-field="degree" placeholder="B.S. Computer Science"></div>
            <div class="form-group"><label>School</label><input type="text" data-field="school" placeholder="MIT"></div>
            <div class="form-group"><label>Year</label><input type="text" data-field="year" placeholder="2018 - 2022"></div>
            <div class="form-group"><label>GPA (optional)</label><input type="text" data-field="gpa" placeholder="3.9/4.0"></div>
        </div>
    </div>`;
    document.getElementById('education-list').insertAdjacentHTML('beforeend', html);
});

// ===== ADD SKILLS =====
document.getElementById('btn-add-skill').addEventListener('click', () => {
    const html = `<div class="list-item">
        <button class="btn-remove" onclick="this.parentElement.remove()">&times;</button>
        <div class="form-grid">
            <div class="form-group"><label>Category</label><input type="text" data-field="category" placeholder="Programming Languages"></div>
            <div class="form-group"><label>Skills (comma-separated)</label><input type="text" data-field="items" placeholder="Python, Java, JavaScript, Go"></div>
        </div>
    </div>`;
    document.getElementById('skills-list').insertAdjacentHTML('beforeend', html);
});

// ===== ADD PROJECT =====
document.getElementById('btn-add-proj').addEventListener('click', () => {
    const html = `<div class="list-item">
        <button class="btn-remove" onclick="this.parentElement.remove()">&times;</button>
        <div class="form-grid">
            <div class="form-group"><label>Project Name</label><input type="text" data-field="name" placeholder="E-Commerce Platform"></div>
            <div class="form-group"><label>Technologies</label><input type="text" data-field="tech" placeholder="React, Node.js, MongoDB"></div>
            <div class="form-group full"><label>Description (one point per line)</label><textarea data-field="bullets" rows="3" placeholder="• Built a full-stack e-commerce platform&#10;• Integrated Stripe payment processing"></textarea></div>
        </div>
    </div>`;
    document.getElementById('projects-list').insertAdjacentHTML('beforeend', html);
    applyTextareaStyle();
});

// ===== ADD CERTIFICATION =====
document.getElementById('btn-add-cert').addEventListener('click', () => {
    const html = `<div class="list-item">
        <button class="btn-remove" onclick="this.parentElement.remove()">&times;</button>
        <div class="form-grid">
            <div class="form-group"><label>Certification Name</label><input type="text" data-field="name" placeholder="AWS Solutions Architect"></div>
            <div class="form-group"><label>Issuer</label><input type="text" data-field="issuer" placeholder="Amazon Web Services"></div>
            <div class="form-group"><label>Year</label><input type="text" data-field="year" placeholder="2023"></div>
        </div>
    </div>`;
    document.getElementById('certs-list').insertAdjacentHTML('beforeend', html);
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

// ===== INIT =====
if (!restoreSavedData()) {
    document.getElementById('btn-add-exp').click();
    document.getElementById('btn-add-edu').click();
    document.getElementById('btn-add-skill').click();
    document.getElementById('btn-add-proj').click();
    document.getElementById('btn-add-cert').click();
}
updateProgress();
