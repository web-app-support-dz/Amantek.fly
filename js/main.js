/* Navigation, langue, formulaires, cookies, inscription */

  /* ---- Navigation ---- */
  function go(page) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    var t = document.getElementById('page-' + page);
    if (t) { t.classList.add('active'); window.scrollTo({top:0, behavior:'smooth'}); }
    // close mobile menu if open
    var mm = document.getElementById('mobile-menu');
    if (mm.classList.contains('open')) toggleMenu();
  }

  /* ---- Mobile menu ---- */
  var menuOpen = false;
  function toggleMenu() {
    menuOpen = !menuOpen;
    var mm = document.getElementById('mobile-menu');
    var mi = document.getElementById('ico-menu');
    var ci = document.getElementById('ico-close');
    mm.classList.toggle('open', menuOpen);
    mi.style.display = menuOpen ? 'none' : '';
    ci.style.display = menuOpen ? '' : 'none';
  }

  /* ---- Language toggle ---- */
  var lang = 'fr';
  function toggleLang() {
    lang = lang === 'fr' ? 'ar' : 'fr';
    var flag  = lang === 'fr' ? '🇫🇷' : '🇩🇿';
    var short = lang === 'fr' ? 'FR' : 'AR';
    var full  = lang === 'fr' ? 'Français' : 'العربية';
    document.getElementById('lang-flag').textContent = flag;
    document.getElementById('lang-text').textContent = short;
    document.getElementById('m-lang-flag').textContent = flag;
    document.getElementById('m-lang-text').textContent = full;
    /* animate chevron */
    var chevron = document.getElementById('lang-chevron');
    if (chevron) {
      chevron.style.transform = lang === 'ar' ? 'rotate(180deg)' : 'rotate(0deg)';
    }
    /* RTL toggle */
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    toast(lang === 'ar' ? 'تم تغيير اللغة إلى العربية' : 'Langue changée en Français');
  }

  /* ---- Toast ---- */
  function toast(msg) {
    var c = document.getElementById('toasts');
    var el = document.createElement('div');
    el.className = 'toast';
    el.style.cssText = 'background:#002B5B;color:#fff;padding:.75rem 1.2rem;border-radius:.75rem;box-shadow:0 10px 15px -3px rgba(0,0,0,.25);font-size:.875rem;font-weight:500;max-width:20rem;';
    el.textContent = '✓ ' + msg;
    c.appendChild(el);
    setTimeout(function(){ if(el.parentNode) el.parentNode.removeChild(el); }, 3100);
  }

  /* ---- FAQ accordion ---- */
  function toggleFaq(btn) {
    var body  = btn.nextElementSibling;
    var arrow = btn.querySelector('.faq-arrow');
    var open  = body.classList.contains('open');
    // close all
    document.querySelectorAll('.faq-body').forEach(function(b){ b.classList.remove('open'); });
    document.querySelectorAll('.faq-arrow').forEach(function(a){ a.classList.remove('rotated'); });
    if (!open) { body.classList.add('open'); arrow.classList.add('rotated'); }
  }

  /* ---- Filter listings ---- */
  function filterList(type) {
    var btns = { all: document.getElementById('f-all'), trip: document.getElementById('f-trips'), parcel: document.getElementById('f-parcels') };
    Object.values(btns).forEach(function(b){ b.style.background='#fff'; b.style.color='#334155'; });
    var active = type==='all' ? btns.all : type==='trip' ? btns.trip : btns.parcel;
    active.style.background='#00C49F'; active.style.color='#fff';
    document.querySelectorAll('#listings-grid > div').forEach(function(card){
      card.style.display = (type==='all' || card.dataset.type===type) ? '' : 'none';
    });
  }

  /* ---- Tab switch register ---- */
  function switchTab(t) {
    var s = document.getElementById('tab-s');
    var v = document.getElementById('tab-t');
    if (t==='s') { s.style.background='#00C49F'; s.style.color='#fff'; v.style.background='transparent'; v.style.color='#6b7280'; }
    else         { v.style.background='#00C49F'; v.style.color='#fff'; s.style.background='transparent'; s.style.color='#6b7280'; }
  }

  /* ---- Toggle password ---- */
  function togglePw(id) {
    var el = document.getElementById(id);
    el.type = el.type==='password' ? 'text' : 'password';
  }

  /* ---- Forms ---- */
  function quickRegister(e)  { e.preventDefault(); toast('Inscription réussie ! Vérifiez votre email.'); e.target.reset(); }
  function handleRegister(e) { e.preventDefault(); toast('Compte créé avec succès ! Vérifiez votre email.'); e.target.reset(); go('home'); }

  /* ================================================================
     REGISTER — SYSTÈME 6 ÉTAPES
  ================================================================ */
  var regCurrentRole = null;
  var regCurrentStep = 1;
  var REG_TOTAL = 6;
  var regCurrentLang = 'fr'; // synced with main site lang

  function rT(ar, fr) { return (typeof lang !== 'undefined' && lang === 'ar') ? ar : fr; }

  // Called from nav "S'inscrire" buttons and listings hero cards
  function regGo(preRole) {
    go('register');
    document.getElementById('reg-role-screen').style.display = 'flex';
    document.getElementById('reg-form-screen').style.display = 'none';
    if (preRole) {
      setTimeout(function() {
        regSelectRole(preRole);
        setTimeout(function() { regStartForm(); }, 350);
      }, 100);
    }
  }

  function regSelectRole(role) {
    regCurrentRole = role;
    var travCard = document.getElementById('reg-card-traveler');
    var sendCard = document.getElementById('reg-card-sender');
    if (travCard) { travCard.style.borderColor = role === 'traveler' ? '#0088FF' : 'rgba(255,255,255,0.22)'; travCard.style.background = role === 'traveler' ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.10)'; }
    if (sendCard) { sendCard.style.borderColor = role === 'sender' ? '#0088FF' : 'rgba(255,255,255,0.22)'; sendCard.style.background = role === 'sender' ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.10)'; }
    var btn = document.getElementById('reg-start-btn');
    if (btn) btn.style.display = 'inline-block';
  }

  function regStartForm() {
    if (!regCurrentRole) return;
    document.getElementById('reg-role-screen').style.display = 'none';
    document.getElementById('reg-form-screen').style.display = 'block';
    regCurrentStep = 1;
    regBuildForm();
    window.scrollTo(0,0);
  }

  function regShowRoleScreen() {
    document.getElementById('reg-form-screen').style.display = 'none';
    document.getElementById('reg-role-screen').style.display = 'flex';
    regCurrentStep = 1;
  }

  function regNext() { if (regCurrentStep < REG_TOTAL) { regCurrentStep++; regBuildForm(); window.scrollTo(0,0); } }
  function regPrev() { if (regCurrentStep > 1) { regCurrentStep--; regBuildForm(); window.scrollTo(0,0); } }

  function regBuildProgress() {
    var travLabels = [rT('تسجيل','Inscr.'), rT('الرحلة','Vol'), rT('الطلبات','Dem.'), rT('التحقق','Vérif.'), rT('الإقلاع','Départ'), rT('التسليم','Livr.')];
    var sendLabels = [rT('تسجيل','Inscr.'), rT('الهوية','KYC'), rT('الطرد','Colis'), rT('مسافر','Voyag.'), rT('الدفع','Paimt.'), rT('التتبع','Suivi')];
    var labels = regCurrentRole === 'traveler' ? travLabels : sendLabels;
    var html = '';
    for (var i = 1; i <= REG_TOTAL; i++) {
      var done = i < regCurrentStep, active = i === regCurrentStep;
      html += '<div class="reg-step-item"><div class="reg-step-col"><div class="reg-step-circle ' + (done?'done':'') + ' ' + (active?'active':'') + '">' + (done?'✓':i) + '</div><div class="reg-step-lbl ' + (active?'active':'') + '">' + labels[i-1] + '</div></div>' + (i < REG_TOTAL ? '<div class="reg-step-line ' + (done?'done':'') + '"></div>' : '') + '</div>';
    }
    document.getElementById('reg-progress-steps').innerHTML = html;
    document.getElementById('reg-step-counter').textContent = regCurrentStep + ' / ' + REG_TOTAL;
    var stepLabels = {
      traveler: [rT('إنشاء حساب المسافر','Créer un compte voyageur'), rT('معلومات الرحلة','Informations du vol'), rT('استقبال الطلبات','Réception des demandes'), rT('جلسة التحقق','Session de vérification'), rT('تأكيد الإقلاع','Confirmation du départ'), rT('التسليم والأرباح','Livraison et revenus')],
      sender: [rT('إنشاء حساب','Créer un compte'), rT('التحقق KYC','Vérification KYC'), rT('تفاصيل الطرد','Détails du colis'), rT('اختيار المسافر','Choisir un voyageur'), rT('الدفع','Paiement'), rT('تتبع الطرد','Suivi du colis')]
    };
    document.getElementById('reg-step-label').textContent = stepLabels[regCurrentRole][regCurrentStep-1];
  }

  function regBuildForm() {
    var titles = { traveler: rT('حساب المسافر الدولي','Compte Voyageur International'), sender: rT('حساب المرسل','Compte Expéditeur') };
    document.getElementById('reg-form-title').textContent = titles[regCurrentRole];
    regBuildProgress();
    var container = document.getElementById('reg-steps-container');
    container.innerHTML = '';
    var panel = document.createElement('div');
    panel.className = 'reg-panel active';
    panel.innerHTML = regCurrentRole === 'traveler' ? regTravelerStep(regCurrentStep) : regSenderStep(regCurrentStep);
    container.appendChild(panel);
  }

  /* ---- TRAVELER STEPS ---- */
  function regTravelerStep(step) {
    switch(step) {
      case 1: return '<div class="reg-step-title"><div class="icon">✈️</div><div><h3>' + rT('انضم لفريق أمانا DZ كمسافر',"Rejoignez l'équipe Amana Express en tant que voyageur") + '</h3><p>' + rT('أنشئ حسابك في خطوات بسيطة','Créez votre compte en quelques étapes simples') + '</p></div></div>' +
        '<div class="reg-card"><div class="reg-form-group"><label class="reg-lbl"><span class="req">*</span> ' + rT('الاسم الكامل','Nom complet') + '</label><input class="reg-input" type="text" placeholder="' + rT('الاسم واللقب','Nom et Prénom') + '"></div>' +
        '<div class="reg-form-group"><label class="reg-lbl"><span class="req">*</span> ' + rT('رقم الهاتف','Numéro de téléphone') + '</label><input class="reg-input" type="tel" placeholder="+213 ___________"></div>' +
        '<div class="reg-input-row"><div class="reg-form-group"><label class="reg-lbl"><span class="req">*</span> ' + rT('البريد الإلكتروني','Email') + '</label><input class="reg-input" type="email" placeholder="email@example.com"></div>' +
        '<div class="reg-form-group"><label class="reg-lbl"><span class="req">*</span> ' + rT('كلمة المرور','Mot de passe') + '</label><input class="reg-input" type="password" placeholder="••••••••"></div></div></div>' +
        '<div class="reg-card"><p style="font-size:13px;font-weight:800;margin-bottom:13px;">📎 ' + rT('وثائق التحقق من الهوية',"Documents d'identité") + '</p>' +
        '<div class="reg-form-group"><label class="reg-lbl"><span class="req">*</span> ' + rT('بطاقة التعريف الوطنية — الوجهان','CNI — Recto et Verso') + '</label><div class="reg-upload-zone"><input type="file" accept="image/*" multiple onchange="regMarkUploaded(this)"><div class="reg-upload-def"><div class="reg-upload-icon">🪪</div><div class="reg-upload-txt">' + rT('اضغط لرفع صورة البطاقة من الجهتين','Télécharger CNI recto/verso') + '</div></div><div class="reg-upload-ok">✅ ' + rT('تم الرفع','Téléchargé') + '</div></div></div>' +
        '<div class="reg-form-group"><label class="reg-lbl">' + rT('جواز السفر','Passeport') + ' <span class="opt">(' + rT('اختياري','facultatif') + ')</span></label><div class="reg-upload-zone"><input type="file" accept="image/*" onchange="regMarkUploaded(this)"><div class="reg-upload-def"><div class="reg-upload-icon">📘</div><div class="reg-upload-txt">' + rT('رفع صورة جواز السفر','Télécharger le passeport') + '</div></div><div class="reg-upload-ok">✅ ' + rT('تم الرفع','Téléchargé') + '</div></div></div></div>' +
        '<div class="reg-card"><div class="reg-consent"><p>🔐 <strong>' + rT('الموافقة الصريحة','Consentement explicite') + '</strong><br>' + rT('نحتاج موافقتك الشخصية قبل معالجة بياناتك الشخصية','Nous avons besoin de votre consentement avant de traiter vos données.') + '</p><div class="reg-consent-chk"><input type="checkbox" id="rc1"><label for="rc1">' + rT('أوافق على معالجة بياناتي الشخصية لأغراض التسجيل',"J'accepte le traitement de mes données personnelles") + '</label></div></div>' +
        '<div class="reg-consent"><p>🔒 <strong>' + rT('أمن البيانات','Sécurité des données') + '</strong><br>' + rT('تطبق أمانا DZ إجراءات أمنية صارمة لحماية بياناتك','Amana Express applique des mesures de sécurité strictes.') + '</p><div class="reg-consent-chk"><input type="checkbox" id="rc2"><label for="rc2">' + rT('أقر بالاطلاع على سياسة أمن البيانات والموافقة عليها',"J'accepte la politique de sécurité des données") + '</label></div></div></div>' +
        '<button class="reg-btn reg-btn-primary" onclick="regNext()">🚀 ' + rT('إنشاء حساب المسافر','Créer le compte voyageur') + '</button>' +
        '<p style="text-align:center;margin-top:14px;font-size:12.5px;color:#6b7280;">' + rT('لديك حساب؟','Vous avez déjà un compte ?') + ' <a href="#" onclick="go(\'login\')" style="color:#00C49F;font-weight:700;text-decoration:none;">' + rT('تسجيل دخول','Se connecter') + '</a></p>';

      case 2: return '<div class="reg-step-title"><div class="icon">🗺️</div><div><h3>' + rT('نشر رحلتي','Publier mon vol') + '</h3><p>' + rT('أدخل تفاصيل رحلتك الجوية','Renseignez les détails de votre vol') + '</p></div></div>' +
        '<div class="reg-card"><p style="font-size:13px;font-weight:800;margin-bottom:13px;">🛫 ' + rT('مطار الانطلاق',"Aéroport de départ") + '</p>' +
        '<div class="reg-badge reg-badge-green">🟢 ' + rT('متاح الآن','Disponible maintenant') + '</div>' +
        ['🇩🇿 '+rT('الجزائر — هواري بومدين (ALG)','Alger — Houari Boumediene (ALG)')+'|→ CDG / ORY / MRS / LYS / BCN / MAD',
         '🇩🇿 '+rT('وهران — أحمد بن بلة (ORN)','Oran — Ahmed Ben Bella (ORN)')+'|→ CDG / MRS / LYS / BCN',
         '🇩🇿 '+rT('قسنطينة — محمد بوضياف (CZL)','Constantine — Mohamed Boudiaf (CZL)')+'|→ CDG / MRS / LYS',
         '🇩🇿 '+rT('عنابة — رابح بيطاط (AAE)','Annaba — Rabah Bitat (AAE)')+'|→ CDG / MRS'
        ].map(function(a){ var p=a.split('|'); return '<div class="reg-airport-item" onclick="regToggleSelect(this)"><div class="reg-apt-name">'+p[0]+'</div><div class="reg-apt-routes">'+p[1]+'</div></div>'; }).join('') +
        '<div class="reg-badge reg-badge-yellow" style="margin-top:12px;">🟡 ' + rT('قريبًا','Bientôt') + '</div>' +
        ['🇩🇿 '+rT('بجاية (BJA)','Bejaia (BJA)'),'🇩🇿 '+rT('تلمسان (TLM)','Tlemcen (TLM)'),'🇩🇿 '+rT('سطيف (QSF)','Sétif (QSF)')].map(function(a){ return '<div class="reg-airport-item disabled"><div class="reg-apt-name">'+a+'</div><button class="reg-apt-notify">🔔 '+rT('أعلمني','Notifiez-moi')+'</button></div>'; }).join('') + '</div>' +
        '<div class="reg-card"><p style="font-size:13px;font-weight:800;margin-bottom:13px;">🛬 ' + rT('وجهة الرحلة','Destination') + '</p>' +
        '<div class="reg-badge reg-badge-green" style="margin-bottom:10px;">🟢 ' + rT('وجهات نشطة','Destinations actives') + '</div>' +
        '<div class="reg-dest-grid">' +
        [{flag:'🇫🇷',name:'France',apts:'CDG/ORY/MRS',active:true},{flag:'🇪🇸',name:'España',apts:'BCN/MAD',active:true},
         {flag:'🇹🇷',name:'Türkiye',apts:'IST',active:false},{flag:'🇮🇹',name:'Italia',apts:'FCO',active:false},
         {flag:'🇸🇦',name:'S.Arabia',apts:'JED',active:false},{flag:'🇦🇪',name:'UAE',apts:'DXB',active:false},
         {flag:'🇹🇳',name:'Tunisie',apts:'',active:false},{flag:'🇨🇦',name:'Canada',apts:'',active:false}
        ].map(function(d){ return '<div class="reg-dest-card' + (d.active?'':' disabled') + '"' + (d.active?' onclick="regToggleSelect(this)"':'') + '><div style="font-size:22px;">' + d.flag + '</div><div style="font-size:11.5px;font-weight:700;margin-top:4px;">' + d.name + '</div>' + (d.apts?'<div style="font-size:10px;color:#6b7280;margin-top:2px;">'+d.apts+'</div>':'') + (!d.active?'<button class="reg-apt-notify">🔔</button>':'') + '</div>'; }).join('') + '</div></div>' +
        '<div class="reg-card"><div class="reg-form-group"><label class="reg-lbl"><span class="req">*</span> ' + rT('تاريخ وساعة الإقلاع','Date et heure du départ') + '</label><div class="reg-input-row"><input class="reg-input" type="date"><input class="reg-input" type="time"></div></div>' +
        '<div class="reg-form-group"><label class="reg-lbl"><span class="req">*</span> ' + rT('الشركة الجوية','Compagnie aérienne') + '</label><select class="reg-select"><option>' + rT('اختر الشركة...','Choisir...') + '</option><option>Air Algérie</option><option>Tassili Airlines</option><option>Air France</option><option>Iberia</option><option>Vueling</option><option>' + rT('أخرى','Autre') + '</option></select></div>' +
        '<div class="reg-form-group"><label class="reg-lbl"><span class="req">*</span> ' + rT('الحيز المتاح للطرود (كغ)','Capacité disponible (kg)') + '</label><input class="reg-input" type="number" min="1" max="30" placeholder="ex: 10 kg"></div></div>' +
        '<div class="reg-warning">⚠️ ' + rT('تذكير مهم: أنت مسؤول قانونيًا عن كل ما تحمله. لا تقبل طرودًا لا تعرف محتواها.',"Rappel : Vous êtes légalement responsable de ce que vous transportez.") + '</div>' +
        '<div class="reg-nav-btns"><button class="reg-btn reg-btn-outline" onclick="regPrev()">← ' + rT('رجوع','Retour') + '</button><button class="reg-btn reg-btn-primary" onclick="regNext()">✈️ ' + rT('نشر الرحلة','Publier le vol') + '</button></div>';

      case 3: return '<div class="reg-step-title"><div class="icon">📬</div><div><h3>' + rT('استقبال الطلبات والقبول','Réception et acceptation des demandes') + '</h3><p>' + rT('راجع طلبات إرسال الطرود الواردة','Examinez les demandes reçues') + '</p></div></div>' +
        [{name:rT('كريم بن عمر','Karim Ben Omar'),w:'8 kg',type:rT('ملابس وهدايا','Vêtements et cadeaux'),price:'4 200'},
         {name:rT('فاطمة الزهراء','Fatima Zahra'),w:'5 kg',type:rT('وثائق وكتب','Documents et livres'),price:'3 100'}
        ].map(function(r,i){ return '<div class="reg-card" id="reg-req-'+i+'"><div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:8px;padding:7px 12px;font-size:12px;color:#047857;font-weight:700;margin-bottom:11px;">🔔 '+rT('طلب جديد','Nouvelle demande')+'</div><div class="reg-t-header"><div class="reg-avatar">👤</div><div><div class="reg-t-name">'+r.name+' <span style="background:#00C49F;color:#fff;font-size:10px;padding:2px 7px;border-radius:10px;">✓ '+rT('موثق','Vérifié')+'</span></div><div class="reg-t-meta">⭐⭐⭐⭐⭐ | '+rT('رحلات','Voyages')+': 12</div></div></div><div class="reg-t-details"><div class="reg-t-detail"><span>'+rT('الوزن','Poids')+':</span> '+r.w+'</div><div class="reg-t-detail"><span>'+rT('المحتوى','Contenu')+':</span> '+r.type+'</div><div class="reg-t-detail"><span>'+rT('السعر','Prix')+':</span> '+r.price+' دج</div><div class="reg-t-detail"><span>'+rT('الوجهة','Dest.')+':</span> 🇫🇷 Paris CDG</div></div><div class="reg-btn-pair"><button class="reg-btn reg-btn-success reg-btn-sm" onclick="regAcceptReq('+i+')">✅ '+rT('قبول','Accepter')+'</button><button class="reg-btn reg-btn-danger" onclick="regRejectReq('+i+')">✕ '+rT('رفض','Refuser')+'</button></div></div>'; }).join('') +
        '<div class="reg-nav-btns"><button class="reg-btn reg-btn-outline" onclick="regPrev()">← ' + rT('رجوع','Retour') + '</button><button class="reg-btn reg-btn-primary" onclick="regNext()">' + rT('متابعة','Continuer') + ' →</button></div>';

      case 4: return '<div class="reg-step-title"><div class="icon">🔍</div><div><h3>' + rT('جلسة التحقق مع أمانا DZ','Session de vérification Amana Express') + '</h3><p>' + rT("في نقطة أمانا داخل المطار يوم الإقلاع","Au point Amana à l'aéroport le jour du départ") + '</p></div></div>' +
        '<div class="reg-card" style="background:linear-gradient(135deg,rgba(0,196,159,0.06),rgba(0,136,255,0.06));"><p style="font-size:13px;font-weight:800;margin-bottom:7px;">🗓️ ' + rT('بطاقة الموعد','Rendez-vous') + '</p><div class="reg-flight-summary">📍 ' + rT('نقطة أمانا DZ — بوابة مطار هواري بومدين',"Point Amana Express — Aéroport Houari Boumediene") + '<br>🕐 ' + rT("يتم تحديده تلقائياً — قبل موعد الصعود","Défini automatiquement — avant l'embarquement") + '</div></div>' +
        '<div class="reg-card"><p style="font-size:13px;font-weight:800;margin-bottom:13px;">📋 ' + rT('إجراءات التحقق الإلزامية','Procédures obligatoires') + '</p><ul class="reg-checklist">' +
        [['🪪',rT('التحقق من وثائق المسافر والمرسل','Vérification des documents voyageur et expéditeur')],
         ['📦',rT('فتح الطرد أمام الطرفين والتأكد من المحتوى','Ouverture du colis devant les deux parties')],
         ['📸',rT('تصوير محتوى الطرد — الصور تُحفظ كدليل رسمي','Photographie du contenu — preuve officielle')],
         ['✍️',rT('توقيع اتفاقية نقل بالأمانة Amana Express','Signature de l\'accord de transport Amana Express')],
         ['🏷️',rT('تغليف الطرد وإلصاق الشريط الأمني','Emballage et scellage sécurisé')]
        ].map(function(item,i){ return '<li><input type="checkbox" id="rchk'+i+'" onchange="regMarkChecked(this)"><label for="rchk'+i+'">'+item[0]+' '+item[1]+'</label></li>'; }).join('') + '</ul></div>' +
        '<div class="reg-nav-btns"><button class="reg-btn reg-btn-outline" onclick="regPrev()">← ' + rT('رجوع','Retour') + '</button><button class="reg-btn reg-btn-primary" onclick="regNext()">✅ ' + rT('إتمام التحقق','Finaliser la vérification') + '</button></div>';

      case 5: return '<div class="reg-step-title"><div class="icon">✈️</div><div><h3>' + rT('تأكيد الإقلاع','Confirmation du départ') + '</h3><p>' + rT('رحلة موفقة!','Bon voyage !') + '</p></div></div>' +
        '<div class="reg-card" style="text-align:center;padding:28px;"><div style="font-size:56px;margin-bottom:11px;">✈️</div><h3 style="font-size:19px;font-weight:900;color:#008E74;">' + rT('رحلة موفقة!','Bon voyage !') + '</h3><div class="reg-flight-summary">🇩🇿 ' + rT('الجزائر ALG','Alger ALG') + ' → 🇫🇷 Paris CDG | 08:30 | ' + rT('رحلة رقم','Vol N°') + ': AH 1001</div></div>' +
        '<div class="reg-card"><p style="font-size:13px;font-weight:800;margin-bottom:13px;">📌 ' + rT('إجراءات التسليم عند الوصول','Procédures à l\'arrivée') + '</p><ul style="list-style:none;font-size:12.5px;line-height:2.2;"><li>🧳 ' + rT('إخراج الطرد فور الوصول من الأمتعة','Récupérer le colis dès l\'arrivée') + '</li><li>💬 ' + rT('إرسال رسالة تأكيد الوصول في دردشة التطبيق','Envoyer un message de confirmation dans le chat') + '</li><li>📞 ' + rT('التواصل مع المستلم على الرقم المقدم من المرسل','Contacter le destinataire au numéro fourni') + '</li><li>🤝 ' + rT('اللقاء مع المستلم وتسليم الطرد','Rencontrer le destinataire et remettre le colis') + '</li><li>📸 ' + rT("تأكيد التسليم في التطبيق مع أخذ صورة","Confirmer la livraison dans l'app avec photo") + '</li></ul></div>' +
        '<div class="reg-reward">🎁 <strong>' + rT('برنامج مكافآت المسافرين:','Programme de récompenses :') + '</strong><br>' + rT("تقييم مرتفع + عدد توصيلات جيد = خصم يصل حتى 100% على تذكرة سفرك القادمة!","Note élevée + livraisons = réduction jusqu'à 100% sur votre prochain billet !") + '</div>' +
        '<div class="reg-nav-btns"><button class="reg-btn reg-btn-outline" onclick="regPrev()">← ' + rT('رجوع','Retour') + '</button><button class="reg-btn reg-btn-primary" onclick="regNext()">✈️ ' + rT('تأكيد الإقلاع','Confirmer le départ') + '</button></div>';

      case 6: return '<div class="reg-step-title"><div class="icon">💰</div><div><h3>' + rT('التسليم والأرباح','Livraison et revenus') + '</h3><p>' + rT('استلم مكافأتك بعد التأكيد','Recevez votre paiement après confirmation') + '</p></div></div>' +
        '<div class="reg-earnings"><div style="font-size:13px;color:rgba(255,255,255,0.8);">' + rT('الأرباح المتوقعة لهذا الشهر','Revenus estimés ce mois') + '</div><div style="font-size:38px;font-weight:900;margin:8px 0 5px;letter-spacing:-1px;">14 600 دج</div><div style="font-size:11.5px;color:rgba(255,255,255,0.7);">≈ 100€</div><div style="background:rgba(255,255,255,0.1);border-radius:8px;padding:7px 12px;font-size:11.5px;margin-top:12px;">💳 ' + rT('تحويل خلال 24 ساعة بعد التأكيد','Virement sous 24h après confirmation') + '</div></div>' +
        '<div class="reg-card"><p style="font-size:13px;font-weight:800;margin-bottom:11px;">📊 ' + rT('آخر التوصيلات','Dernières livraisons') + '</p>' +
        [{name:rT('كريم','Karim'),dest:'Paris CDG',weight:'8 kg',price:'4 200',status:'done'},{name:rT('فاطمة','Fatima'),dest:'Lyon',weight:'5 kg',price:'3 100',status:'done'}].map(function(d){ return '<div style="display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid #e8eef4;font-size:12.5px;"><div><span style="font-weight:700;">'+d.name+'</span><br><span style="color:#6b7280;">→ '+d.dest+' | '+d.weight+'</span></div><div style="text-align:right;"><div style="font-weight:800;color:#00C49F;">+'+d.price+' دج</div><div style="color:#10b981;font-size:11px;">✅ '+rT('تم التحويل','Viré')+'</div></div></div>'; }).join('') + '</div>' +
        '<button class="reg-btn reg-btn-primary" onclick="toast(\'🎉 ' + rT('تم التسجيل بنجاح! مرحباً في أمانا','Inscription réussie! Bienvenue sur Amana') + '\'); go(\'home\');">🎉 ' + rT('إنهاء وانطلق!','Terminer et commencer !') + '</button>';
    }
  }

  /* ---- SENDER STEPS ---- */
  function regSenderStep(step) {
    switch(step) {
      case 1: return '<div class="reg-step-title"><div class="icon">📦</div><div><h3>' + rT('إنشاء حساب المرسل',"Créer un compte expéditeur") + '</h3><p>' + rT('أرسل طردك بأمان وبتكلفة أقل','Envoyez vos colis en toute sécurité') + '</p></div></div>' +
        '<div class="reg-card"><div class="reg-form-group"><label class="reg-lbl"><span class="req">*</span> ' + rT('الاسم الكامل','Nom complet') + '</label><input class="reg-input" type="text" placeholder="' + rT('الاسم واللقب','Nom et Prénom') + '"></div>' +
        '<div class="reg-form-group"><label class="reg-lbl"><span class="req">*</span> ' + rT('رقم الهاتف','Numéro de téléphone') + '</label><input class="reg-input" type="tel" placeholder="+213 ___________"></div>' +
        '<div class="reg-input-row"><div class="reg-form-group"><label class="reg-lbl"><span class="req">*</span> ' + rT('البريد الإلكتروني','Email') + '</label><input class="reg-input" type="email" placeholder="email@example.com"></div>' +
        '<div class="reg-form-group"><label class="reg-lbl"><span class="req">*</span> ' + rT('كلمة المرور','Mot de passe') + '</label><input class="reg-input" type="password" placeholder="••••••••"></div></div></div>' +
        '<div class="reg-card"><div class="reg-form-group"><label class="reg-lbl">' + rT('صورة شخصية','Photo de profil') + ' <span class="opt">(' + rT('اختياري','facultatif') + ')</span></label><div class="reg-upload-zone"><input type="file" accept="image/*" onchange="regMarkUploaded(this)"><div class="reg-upload-def"><div class="reg-upload-icon">📷</div><div class="reg-upload-txt">' + rT('رفع صورة شخصية','Télécharger une photo') + '</div></div><div class="reg-upload-ok">✅ ' + rT('تم الرفع','Téléchargé') + '</div></div></div></div>' +
        '<div class="reg-card"><div class="reg-consent"><p>🔐 <strong>' + rT('الموافقة الصريحة','Consentement explicite') + '</strong></p><div class="reg-consent-chk"><input type="checkbox" id="sc1"><label for="sc1">' + rT('أوافق على شروط الاستخدام وسياسة الخصوصية',"J'accepte les CGU et la politique de confidentialité") + '</label></div></div></div>' +
        '<button class="reg-btn reg-btn-primary" onclick="regNext()">📦 ' + rT('إنشاء حساب','Créer le compte') + '</button>' +
        '<p style="text-align:center;margin-top:14px;font-size:12.5px;color:#6b7280;">' + rT('لديك حساب؟','Vous avez déjà un compte ?') + ' <a href="#" onclick="go(\'login\')" style="color:#00C49F;font-weight:700;text-decoration:none;">' + rT('تسجيل دخول','Se connecter') + '</a></p>';

      case 2: return '<div class="reg-step-title"><div class="icon">🪪</div><div><h3>' + rT("التحقق من الهوية KYC","Vérification d'identité KYC") + '</h3><p>' + rT('سيتم مراجعة هويتك خلال 24 ساعة','Votre identité sera vérifiée dans les 24h') + '</p></div></div>' +
        '<div class="reg-card"><div class="reg-form-group"><label class="reg-lbl"><span class="req">*</span> ' + rT('بطاقة التعريف الوطنية — الوجهان','CNI — Recto et Verso') + '</label><div class="reg-upload-zone"><input type="file" accept="image/*" multiple onchange="regMarkUploaded(this)"><div class="reg-upload-def"><div class="reg-upload-icon">🪪</div><div class="reg-upload-txt">' + rT('رفع صورة CNI من الجهتين','Télécharger CNI recto/verso') + '</div></div><div class="reg-upload-ok">✅ ' + rT('تم الرفع','Téléchargé') + '</div></div></div>' +
        '<div class="reg-form-group"><label class="reg-lbl"><span class="req">*</span> ' + rT('صورة شخصية للمرسل',"Photo personnelle de l'expéditeur") + '</label><div class="reg-upload-zone"><input type="file" accept="image/*" onchange="regMarkUploaded(this)"><div class="reg-upload-def"><div class="reg-upload-icon">🤳</div><div class="reg-upload-txt">' + rT('رفع صورة شخصية واضحة','Télécharger une photo claire') + '</div></div><div class="reg-upload-ok">✅ ' + rT('تم الرفع','Téléchargé') + '</div></div></div></div>' +
        '<div class="reg-card"><p style="font-size:13px;font-weight:800;margin-bottom:11px;">🤝 ' + rT("هل ستحضر بنفسك لجلسة التحقق؟","Serez-vous présent(e) à la session ?") + '</p><label style="display:flex;align-items:center;gap:9px;cursor:pointer;font-size:13px;margin-bottom:9px;"><input type="radio" name="reg-presence" value="yes" style="accent-color:#00C49F;"> ' + rT("نعم، سأحضر شخصياً","Oui, je serai présent(e)") + '</label><label style="display:flex;align-items:center;gap:9px;cursor:pointer;font-size:13px;"><input type="radio" name="reg-presence" value="no" onchange="document.getElementById(\'reg-proxy\').style.display=\'block\'" style="accent-color:#00C49F;"> ' + rT("لا، سأرسل نائباً (يلزم توكيل رسمي)","Non, j'enverrai un représentant (procuration requise)") + '</label><div id="reg-proxy" class="reg-info" style="display:none;">⚠️ <strong>' + rT("في حال إرسال نائب:","En cas de représentant :") + '</strong><br>' + rT("• توكيل رسمي مصدق","• Procuration certifiée") + '<br>' + rT("• بطاقة تعريف النائب + نسخة من بطاقة المرسل","• CNI du représentant + copie CNI expéditeur") + '<br>' + rT("• المرسل يبقى مسؤولاً قانونياً","• L'expéditeur reste légalement responsable") + '</div></div>' +
        '<div class="reg-info">⏳ ' + rT('سيتم مراجعة هويتك خلال 24 ساعة. ستتلقى إشعارًا فور التحقق.',"Votre identité sera examinée dans les 24h. Notification à la validation.") + '</div>' +
        '<div class="reg-nav-btns"><button class="reg-btn reg-btn-outline" onclick="regPrev()">← ' + rT('رجوع','Retour') + '</button><button class="reg-btn reg-btn-primary" onclick="regNext()">📤 ' + rT("إرسال للمراجعة","Soumettre") + '</button></div>';

      case 3: return '<div class="reg-step-title"><div class="icon">📦</div><div><h3>' + rT("تفاصيل الطرد","Détails du colis") + '</h3><p>' + rT("صف طردك بدقة لضمان التسليم الآمن","Décrivez votre colis avec précision") + '</p></div></div>' +
        '<div class="reg-card"><div class="reg-form-group"><label class="reg-lbl"><span class="req">*</span> ' + rT("من — الولاية","De — Wilaya") + '</label><select class="reg-select"><option>' + rT("اختر الولاية...","Choisir...") + '</option>' + ['الجزائر','وهران','قسنطينة','عنابة','بجاية','سطيف','تلمسان','بلعباس'].map(function(w){ return '<option>'+w+'</option>'; }).join('') + '</select></div>' +
        '<div class="reg-form-group"><label class="reg-lbl"><span class="req">*</span> ' + rT("إلى — البلد والمدينة","Vers — Pays et Ville") + '</label><div class="reg-input-row"><select class="reg-select"><option>' + rT("البلد...","Pays...") + '</option><option>🇫🇷 France</option><option>🇪🇸 España</option><option>🇹🇳 Tunisie</option></select><input class="reg-input" type="text" placeholder="' + rT("المدينة / المطار","Ville / Aéroport") + '"></div></div></div>' +
        '<div class="reg-card"><div class="reg-input-row"><div class="reg-form-group"><label class="reg-lbl"><span class="req">*</span> ' + rT("الوزن (كغ)","Poids (kg)") + '</label><input class="reg-input" type="number" min="0.1" max="30" placeholder="ex: 5"></div><div class="reg-form-group"><label class="reg-lbl">' + rT("الأبعاد (سم)","Dimensions (cm)") + '</label><input class="reg-input" type="text" placeholder="L × W × H"></div></div>' +
        '<div class="reg-form-group"><label class="reg-lbl"><span class="req">*</span> ' + rT("نوع المحتوى","Type de contenu") + '</label><div class="reg-content-grid">' +
        [['👕',rT('ملابس','Vêtements')],['📄',rT('وثائق','Documents')],['🎁',rT('هدايا','Cadeaux')],['🎒',rT('أغراض شخصية','Affaires')],['💊',rT('طبي','Médical')],['📚',rT('كتب','Livres')]].map(function(c){ return '<div class="reg-content-chip" onclick="regToggleSelect(this)"><div style="font-size:20px;">'+c[0]+'</div><div style="font-size:10.5px;font-weight:700;margin-top:3px;">'+c[1]+'</div></div>'; }).join('') + '</div></div>' +
        '<div class="reg-form-group"><label class="reg-lbl"><span class="req">*</span> ' + rT("القيمة التقديرية (دج)","Valeur estimée (DZD)") + '</label><input class="reg-input" type="number" placeholder="' + rT("بالدينار الجزائري","En dinars algériens") + '"></div></div>' +
        '<div class="reg-card"><p style="font-size:13px;font-weight:800;margin-bottom:11px;">📸 ' + rT("صور المحتوى (3 على الأقل)","Photos du contenu (3 minimum)") + '</p><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:7px;">' +
        [1,2,3].map(function(i){ return '<div class="reg-upload-zone" style="padding:13px;"><input type="file" accept="image/*" onchange="regMarkUploaded(this)"><div class="reg-upload-def"><div class="reg-upload-icon" style="font-size:20px;">📷</div><div class="reg-upload-txt" style="font-size:10px;">'+rT('صورة','Photo')+' '+i+'</div></div><div class="reg-upload-ok" style="font-size:10px;">✅</div></div>'; }).join('') + '</div></div>' +
        '<div class="reg-nav-btns"><button class="reg-btn reg-btn-outline" onclick="regPrev()">← ' + rT("رجوع","Retour") + '</button><button class="reg-btn reg-btn-primary" onclick="regNext()">🔍 ' + rT("ابحث عن مسافر","Chercher un voyageur") + '</button></div>';

      case 4: return '<div class="reg-step-title"><div class="icon">👤</div><div><h3>' + rT("اختيار المسافر","Choisir un voyageur") + '</h3><p>' + rT("اختر المسافر المناسب لطردك","Sélectionnez le voyageur idéal") + '</p></div></div>' +
        [{name:rT('يوسف حداد','Youcef Haddad'),trips:28,airline:'Air Algérie',route:'ALG → CDG',date:'18 Mai 09:30',cap:'12 kg',stars:5},
         {name:rT('سارة مزيان','Sara Meziane'),trips:15,airline:'Air Algérie',route:'ALG → MRS',date:'19 Mai 11:00',cap:'8 kg',stars:4}
        ].map(function(tr,i){ return '<div class="reg-traveler-card" id="reg-tcard-'+i+'"><div class="reg-t-header"><div class="reg-avatar">✈️</div><div style="flex:1;"><div class="reg-t-name">'+tr.name+' <span style="background:rgba(16,185,129,0.12);color:#10b981;font-size:10px;padding:2px 8px;border-radius:10px;">✓ '+rT('موثق','Vérifié')+'</span></div><div class="reg-t-meta">'+'⭐'.repeat(tr.stars)+' | '+tr.trips+' '+rT('رحلة','voyages')+'</div></div></div><div class="reg-t-details"><div class="reg-t-detail"><span>'+rT('الشركة','Cie')+':</span> '+tr.airline+'</div><div class="reg-t-detail"><span>'+rT('المسار','Trajet')+':</span> '+tr.route+'</div><div class="reg-t-detail"><span>'+rT('الموعد','Date')+':</span> '+tr.date+'</div><div class="reg-t-detail"><span>'+rT('المتاح','Cap.')+':</span> '+tr.cap+'</div></div><div class="reg-btn-pair"><button class="reg-btn reg-btn-primary reg-btn-sm" onclick="regChooseTraveler('+i+')">'+rT('اختيار','Choisir')+'</button><button class="reg-btn reg-btn-outline reg-btn-sm" onclick="toast(\''+rT('تم إرسال رسالة للمسافر!','Message envoyé au voyageur !')+'\')">'+ rT('تواصل','Contacter')+'</button></div></div>'; }).join('') +
        '<div class="reg-nav-btns"><button class="reg-btn reg-btn-outline" onclick="regPrev()">← ' + rT("رجوع","Retour") + '</button><button class="reg-btn reg-btn-primary" onclick="regNext()">' + rT("متابعة","Continuer") + ' →</button></div>';

      case 5: return '<div class="reg-step-title"><div class="icon">💳</div><div><h3>' + rT("الدفع بالتسعير الذكي","Paiement par tarification intelligente") + '</h3><p>' + rT("السعر محدد تلقائياً بالذكاء الاصطناعي","Prix défini automatiquement par IA") + '</p></div></div>' +
        '<div class="reg-card"><p style="font-size:13px;font-weight:800;margin-bottom:11px;">📋 ' + rT("ملخص الطلب","Récapitulatif") + '</p><div style="font-size:12.5px;line-height:2.2;">' +
        [['traveler',rT('يوسف حداد','Youcef Haddad')],['dest','🇫🇷 Paris CDG'],['date','18 Mai 2026 — 09:30'],['weight','6 kg'],['content',rT('ملابس','Vêtements')]].map(function(r){ return '<div style="display:flex;justify-content:space-between;"><span style="color:#6b7280;">'+rT(r[0]==='traveler'?'المسافر':r[0]==='dest'?'الوجهة':r[0]==='date'?'الموعد':r[0]==='weight'?'الوزن':'المحتوى',r[0]==='traveler'?'Voyageur':r[0]==='dest'?'Destination':r[0]==='date'?'Date':r[0]==='weight'?'Poids':'Contenu')+':</span><span>'+r[1]+'</span></div>'; }).join('') + '</div></div>' +
        '<div class="reg-card"><p style="font-size:13px;font-weight:800;margin-bottom:11px;">💰 ' + rT("تفصيل السعر","Détail du tarif") + '</p>' +
        [[rT('أجر النقل الأساسي','Transport de base'),'6 500 دج'],[rT('عمولة أمانا (20%)','Commission Amana (20%)'),'1 300 دج'],[rT('تأمين إضافي','Assurance'),'500 دج'],['TVA (19%)','1 044 دج'],[rT('توفير مقارنة بشركات الشحن','Économie vs. transporteurs'),'−12 000 دج'],[rT('الإجمالي','Total'),'9 344 دج']].map(function(r,i){ return '<div class="reg-price-row'+(i===4?' saving':'')+(i===5?' last':'')+'"><span>'+r[0]+'</span><span>'+r[1]+'</span></div>'; }).join('') + '</div>' +
        '<div class="reg-card"><p style="font-size:13px;font-weight:800;margin-bottom:11px;">💳 ' + rT("طريقة الدفع","Mode de paiement") + '</p><div class="reg-pay-opts">' +
        [{id:'baridimob',icon:'📱',label:'BaridiMob',sub:rT('دفع إلكتروني فوري','Paiement instantané'),sel:true},{id:'cib',icon:'💳',label:'CIB',sub:rT('دفع ببطاقة البنك','Paiement par carte'),sel:false},{id:'cash',icon:'💵',label:rT('دفع يدوي','Paiement manuel'),sub:rT('يُدفع خلال جلسة التحقق','Payé lors de la vérification'),sel:false}].map(function(p){ return '<label class="reg-pay-opt'+(p.sel?' selected':'') + '" onclick="regSelectPayment(this)"><input type="radio" name="reg-payment" value="'+p.id+'"'+(p.sel?' checked':'')+'><span style="font-size:20px;">'+p.icon+'</span><div><div style="font-weight:700;font-size:13.5px;">'+p.label+'</div><div style="font-size:11.5px;color:#6b7280;">'+p.sub+'</div></div></label>'; }).join('') + '</div></div>' +
        '<div class="reg-nav-btns"><button class="reg-btn reg-btn-outline" onclick="regPrev()">← ' + rT("رجوع","Retour") + '</button><button class="reg-btn reg-btn-primary" onclick="regNext()">✅ ' + rT("تأكيد الطلب","Confirmer la commande") + '</button></div>';

      case 6: return '<div class="reg-step-title"><div class="icon">📡</div><div><h3>' + rT("تتبع الطرد","Suivi du colis") + '</h3><p>' + rT("تابع طردك في كل مرحلة","Suivez votre colis à chaque étape") + '</p></div></div>' +
        '<div class="reg-tracking"><div style="font-size:11.5px;color:#6b7280;margin-bottom:7px;">' + rT("رقم التتبع","Numéro de suivi") + '</div><div style="font-size:20px;font-weight:900;color:#00C49F;letter-spacing:1px;">TRK-2026-AX4817</div><div style="display:inline-block;background:#f59e0b;color:#fff;padding:4px 13px;border-radius:20px;font-size:12px;font-weight:700;margin-top:7px;">🟡 ' + rT("في انتظار جلسة التحقق","En attente de la session Amana") + '</div></div>' +
        '<div class="reg-card"><p style="font-size:13px;font-weight:800;margin-bottom:13px;">📊 ' + rT("خط زمني للطرد","Chronologie du colis") + '</p><div class="reg-timeline">' +
        [{icon:'✅',label:rT('قبول الطلب','Acceptation de la demande'),time:'16 Mai 2026 — 14:22',done:true,cur:false},
         {icon:'🔍',label:rT('التحقق من الطرد بواسطة أمانا','Vérification du colis par Amana'),time:'18 Mai 2026 — 07:30',done:false,cur:true},
         {icon:'📦',label:rT('التسليم للمسافر في نقطة أمانا','Remise au voyageur au point Amana'),time:'',done:false,cur:false},
         {icon:'✈️',label:rT('إقلاع الطائرة','Décollage'),time:'',done:false,cur:false},
         {icon:'🛬',label:rT('الوصول للوجهة','Arrivée à destination'),time:'',done:false,cur:false},
         {icon:'🤝',label:rT('تأكيد الاستلام','Confirmation de réception'),time:'',done:false,cur:false},
         {icon:'💳',label:rT('تحويل المبلغ','Virement du montant'),time:'',done:false,cur:false}
        ].map(function(e){ return '<div class="reg-tl-item"><div><div class="reg-tl-dot'+(e.done?' done':'')+(e.cur?' current':'')+'"></div><div class="reg-tl-content"><div class="reg-tl-title" style="'+(e.done?'color:#00C49F':e.cur?'color:#0088FF;font-weight:800':'color:#6b7280')+'">'+e.icon+' '+e.label+'</div><div class="reg-tl-time">'+( e.time||rT('في انتظار التحديث','En attente'))+'</div></div></div></div>'; }).join('') + '</div></div>' +
        '<div class="reg-info">📡 ' + rT("نظام تتبع GPS سيُفعَّل قريبًا. حاليًا نعتمد نظام التأكيدات الرسمية.","Le suivi GPS sera activé prochainement. Nous utilisons le système de confirmations.") + '</div>' +
        '<button class="reg-btn reg-btn-primary" onclick="toast(\'🎉 ' + rT("تم تسجيل طلبك بنجاح!","Votre commande a été enregistrée !") + '\'); go(\'home\');">🎉 ' + rT("إنهاء وتتبع طردك!","Terminer et suivre votre colis !") + '</button>';
    }
  }

  /* ---- REGISTER HELPERS ---- */
  function regMarkUploaded(input) { if (input.files && input.files.length > 0) { input.closest('.reg-upload-zone').classList.add('uploaded'); } }
  function regToggleSelect(el) { el.classList.toggle('selected'); }
  function regSelectPayment(el) { document.querySelectorAll('.reg-pay-opt').forEach(function(o){ o.classList.remove('selected'); }); el.classList.add('selected'); }
  function regMarkChecked(cb) { var li = cb.closest('li'); if (cb.checked) { li.style.textDecoration = 'line-through'; li.style.color = '#6b7280'; } else { li.style.textDecoration = ''; li.style.color = ''; } }
  function regAcceptReq(i) { var c = document.getElementById('reg-req-'+i); if(c){ c.style.borderColor='#10b981'; c.style.background='rgba(16,185,129,0.04)'; } toast(rT('تم قبول الطلب ✅','Demande acceptée ✅')); }
  function regRejectReq(i) { var c = document.getElementById('reg-req-'+i); if(c){ c.style.opacity='0.35'; c.style.pointerEvents='none'; } toast(rT('تم رفض الطلب','Demande refusée')); }
  function regChooseTraveler(i) { document.querySelectorAll('[id^="reg-tcard-"]').forEach(function(c){ c.style.borderColor=''; c.style.background=''; }); var c = document.getElementById('reg-tcard-'+i); if(c){ c.style.borderColor='#10b981'; c.style.background='rgba(16,185,129,0.04)'; } toast(rT('تم اختيار المسافر ✅','Voyageur sélectionné ✅')); }
  function regCloseModal(e) { var m = document.getElementById('reg-modal'); if(!e || e.target === m){ m.style.display='none'; } }
  function handleSearch(e)   { e.preventDefault(); toast('Recherche effectuée !'); }
  function setRating(btn,val){document.querySelectorAll('[data-rating]').forEach(function(b){b.style.background='#fff';b.style.color='#6b7280';b.style.borderColor='#e8eef4';});btn.style.background='#00C49F';btn.style.color='#fff';btn.style.borderColor='#00C49F';document.getElementById('min-rating').value=val;}
  function previewPhoto(input){var prev=document.getElementById('photo-preview');if(input.files&&input.files[0]){var reader=new FileReader();reader.onload=function(e){prev.innerHTML='<img src="'+e.target.result+'" style="max-width:100%;border-radius:.5rem;max-height:80px;object-fit:cover;">';prev.style.display='block';};reader.readAsDataURL(input.files[0]);}}
  function handleContact(e)  { e.preventDefault(); toast('Message envoyé ! Nous vous répondrons sous 24h.'); e.target.reset(); }

  /* ---- Cookie banner ---- */
  function acceptCookies() {
    document.getElementById('cookie-banner').style.display = 'none';
    try { localStorage.setItem('amana_cookies', 'accepted'); } catch(e) {}
    toast('Préférences cookies enregistrées.');
  }
  function declineCookies() {
    document.getElementById('cookie-banner').style.display = 'none';
    try { localStorage.setItem('amana_cookies', 'declined'); } catch(e) {}
  }
  /* Show cookie banner only if not yet decided */
  (function() {
    try {
      if (localStorage.getItem('amana_cookies')) {
        var b = document.getElementById('cookie-banner');
        if (b) b.style.display = 'none';
      }
    } catch(e) {}
  })();
