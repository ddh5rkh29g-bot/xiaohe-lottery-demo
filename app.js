const prizes = [
  { name: '实物奖·投影仪', type: '实物', image: 'assets/prize-projector.png', mode: 'fixed', value: 10, probability: 10, cap: 10, virtual: '否' },
  { name: '专注之星勋章', type: '虚拟权益', image: 'assets/prize-robot.png', mode: 'ratio', value: 10, probability: 10, cap: null, virtual: '否' },
  { name: '限定课堂皮肤', type: '虚拟权益', image: 'assets/prize-camera.png', mode: 'ratio', value: 20, probability: 20, cap: null, virtual: '否' }
];

let editingPrizeIndex = -1;
const digitalPrizeTypes = new Set(['优惠券', '学贝', '皮肤', '勋章', '虚拟权益']);
const isDigitalPrizeType = type => digitalPrizeTypes.has(type);

const teacherWinningRecords = [
  { lesson: '读绘本学表达：轻松写出比喻句', lotteryType: 'class', lotteryId: '3867529386673151', lotteryName: '数学二宇航员皮肤', role: '主讲', initiator: '李金彩主讲', student: '小象同学', studentId: '3496698479691775', renewed: '否', prizeType: '皮肤', prizeName: '数学二宇航员皮肤', wonAt: '2026-01-29 14:11:57', delivery: '' },
  { lesson: '读绘本学表达：轻松写出比喻句', lotteryType: 'class', lotteryId: '3955273582134271', lotteryName: '测试抽奖刘莹', role: '主讲', initiator: '李金彩主讲', student: '小象同学', studentId: '3496698479691775', renewed: '否', prizeType: '勋章', prizeName: '勋章', wonAt: '2026-01-29 14:54:19', delivery: '' },
  { lesson: '', lotteryType: 'post', lotteryId: '4218555718976511', lotteryName: '0803课外幸运抽奖', role: '系统', initiator: '系统', student: '小象同学', studentId: '3496698479691775', renewed: '否', prizeType: '实物', prizeName: '投影仪', wonAt: '2026-08-03 20:15:08', delivery: '已填写' },
  { lesson: '', lotteryType: 'post', lotteryId: '4204439097328127', lotteryName: '暑期课外抽奖', role: '系统', initiator: '系统', student: '小盒同学', studentId: '3496698479691886', renewed: '是', prizeType: '勋章', prizeName: '专注之星勋章', wonAt: '2026-08-04 09:32:41', delivery: '' }
];

const state = {
  activities: [
    { id: '4218555718976511', name: '0803测试', type: 'post', scope: '数学体验课·2个班', status: '进行中', startEnd: '2026-08-03 - 2026-09-01', updated: '2026-08-03 14:35:41', creator: '杨富裕', modifier: '杨富裕' },
    { id: '4204439097328127', name: '111', type: 'post', scope: '数学体验课·2个班', status: '进行中', startEnd: '2026-07-24 - 2026-08-19', updated: '2026-07-24 15:09:54', creator: '杨富裕', modifier: '' },
    { id: '4191665679778815', name: '8年级拼盘课虚拟物抽奖', type: 'class', scope: '数学体验课·3个班', status: '进行中', startEnd: '2026-03-30 - 2026-08-28', updated: '2026-07-15 14:44:33', creator: '杨富裕', modifier: '杨富裕' },
    { id: '4142274404959231', name: '9年级拼盘课虚拟物抽奖', type: 'class', scope: '数学体验课·3个班', status: '进行中', startEnd: '2026-03-30 - 2026-08-28', updated: '2026-07-15 14:44:39', creator: '杨富裕', modifier: '杨富裕' },
    { id: '4142273769914879', name: '初中双周低价数学-第3讲抽奖', type: 'class', scope: '数学体验课·2个班', status: '进行中', startEnd: '2026-03-30 - 2026-08-28', updated: '2026-06-10 17:13:12', creator: '杨富裕', modifier: '' },
    { id: '4142273566098431', name: '初中双周低价数学-第2讲抽奖', type: 'class', scope: '数学体验课·2个班', status: '进行中', startEnd: '2026-03-30 - 2026-08-28', updated: '2026-06-10 17:13:11', creator: '杨富裕', modifier: '杨富裕' },
    { id: '4142273015333887', name: '初中双周低价数学-第1讲抽奖', type: 'class', scope: '数学体验课·2个班', status: '进行中', startEnd: '2026-03-30 - 2026-08-28', updated: '2026-06-10 17:13:10', creator: '杨富裕', modifier: '杨富裕' },
    { id: '4140715538269183', name: '初中双周低价数学-实物抽奖', type: 'class', scope: '数学体验课·2个班', status: '进行中', startEnd: '2026-03-30 - 2026-08-28', updated: '2026-06-09 14:49:19', creator: '杨富裕', modifier: '杨富裕' },
    { id: '4113869559579135', name: '六年级升学专属第二讲', type: 'class', scope: '数学体验课·全员', status: '进行中', startEnd: '2026-05-21 - 2028-05-04', updated: '2026-05-21 15:46:03', creator: '郑林如', modifier: '郑林如' },
    { id: '4113860246258175', name: '六年级升学专属第一讲', type: 'class', scope: '数学体验课·全员', status: '进行中', startEnd: '2026-05-21 - 2028-05-02', updated: '2026-05-21 15:46:01', creator: '郑林如', modifier: '郑林如' }
  ],
  relations: [
    { a: '4142273769914879', b: '4218555718976511', aToB: 'no_win', bToA: 'no_win' },
    { a: '4142273769914879', b: '4204439097328127', aToB: 'no_win', bToA: 'none' }
  ],
  currentId: '4218555718976511', detailMode: 'edit', editType: null,
  activityEligibility: 'valid', classLotteryStatus: 'not_joined', participationStatus: 'not_joined', lotteryOutcome: 'physical_pending', formalCourseStatus: 'not_enrolled', salesLinkStatus: 'single',
  spun: false, rotation: 0, studentScreen: 'lottery', rulesReturnScreen: 'lottery', usedChanceAction: 'records'
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const activity = id => state.activities.find(item => item.id === id);
const typeText = type => type === 'post' ? '课外抽奖' : '课中抽奖';
const listTypeText = type => type === 'post' ? '课外抽奖' : '课中抽奖';
const ruleText = rule => ({ none: '不限制', no_win: '已中奖不可中奖' }[rule] || '不限制');
const currentOffClassStatus = () => state.participationStatus === 'participated' ? state.lotteryOutcome : 'not_joined';
const selectedDrawResult = () => state.lotteryOutcome.startsWith('physical_') ? 'physical' : state.lotteryOutcome;
const salesLinkCandidates = {
  none: [],
  single: [
    { classId: '3953636989879295', className: '数学体验A班', scopeOrder: 1, url: 'https://h5.xiaohe.com/course/signup?class_id=3953636989879295' }
  ],
  multiple: [
    { classId: '3953636989879295', className: '数学体验A班', scopeOrder: 1, url: 'https://h5.xiaohe.com/course/signup?class_id=3953636989879295' },
    { classId: '3953639342621183', className: '数学体验B班', scopeOrder: 2, url: 'https://h5.xiaohe.com/course/signup?class_id=3953639342621183' }
  ]
};
const selectedSalesLink = () => [...(salesLinkCandidates[state.salesLinkStatus] || [])].sort((a, b) => a.scopeOrder - b.scopeOrder || a.classId.localeCompare(b.classId))[0] || null;
let relationCandidates = [];

function showToast(message) {
  const toast = $('#toast'); toast.textContent = message; toast.classList.add('show');
  clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('show'), 1800);
}
async function copyLotteryLink(id) {
  const link = `https://h5.xiaohe.com/lottery?activity_id=${encodeURIComponent(id)}`;
  try {
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(link);
    else {
      const helper = document.createElement('textarea');
      helper.value = link; helper.setAttribute('readonly', ''); helper.style.position = 'fixed'; helper.style.opacity = '0';
      document.body.appendChild(helper); helper.select(); document.execCommand('copy'); helper.remove();
    }
    showToast('抽奖链接已复制');
  } catch (error) {
    showToast('链接复制失败，请进入编辑页手动复制');
  }
}
function openModal(id) { const el = document.getElementById(id); el.classList.add('open'); el.setAttribute('aria-hidden', 'false'); }
function closeModal(id) { const el = document.getElementById(id); el.classList.remove('open'); el.setAttribute('aria-hidden', 'true'); }
const teacherCopyLinkActivities = () => state.activities.filter(item => item.type === 'post' && item.status !== '已下架');
function renderTeacherLotteryLinkOptions() {
  const options = teacherCopyLinkActivities();
  $('#teacherLotteryLinkOptions').innerHTML = options.map((item, index) => `<label class="lottery-link-option${index === 0 ? ' selected' : ''}"><input type="radio" name="teacherLotteryLinkActivity" value="${item.id}"${index === 0 ? ' checked' : ''}><span class="lottery-link-option-main"><span class="lottery-link-option-name">${item.name}</span><span class="lottery-link-option-meta"><span>活动 ID：${item.id}</span><span>全局有效期：${item.startEnd}</span></span></span><span class="lottery-link-option-status">${item.status}</span></label>`).join('') || '<div class="empty-link-options">当前小班暂无可用的课外抽奖活动</div>';
  $$('#teacherLotteryLinkOptions input[name="teacherLotteryLinkActivity"]').forEach(input => input.addEventListener('change', () => {
    $$('.lottery-link-option', $('#teacherLotteryLinkOptions')).forEach(option => option.classList.toggle('selected', option.querySelector('input').checked));
  }));
}
function openTeacherLotteryLinkPicker() { renderTeacherLotteryLinkOptions(); openModal('teacherLotteryLinkModal'); }
function switchView(name) {
  $$('.view-tab').forEach(btn => btn.classList.toggle('active', btn.dataset.view === (name === 'classDetail' ? 'list' : name)));
  $$('.view').forEach(view => view.classList.remove('active'));
  document.getElementById(`${name}View`).classList.add('active');
  if (name === 'detail') renderDetail();
  if (name === 'classDetail') renderClassDetail();
  if (name === 'teacherRecords') renderTeacherRecords();
  if (name === 'student') renderStudent();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderTeacherRecords() {
  const lotteryType = $('#teacherLotteryTypeFilter').value;
  const prizeType = $('#teacherPrizeTypeFilter').value;
  const lesson = $('#teacherLessonFilter').value;
  const student = $('#teacherStudentFilter').value.trim().toLowerCase();
  const rows = teacherWinningRecords.filter(item =>
    (lotteryType === 'all' || item.lotteryType === lotteryType) &&
    (prizeType === 'all' || item.prizeType === prizeType) &&
    (lesson === 'all' || item.lesson === lesson) &&
    (!student || `${item.student}${item.studentId}`.toLowerCase().includes(student))
  );
  $('#teacherRecordsBody').innerHTML = rows.map(item => `<tr data-lottery-type="${item.lotteryType}">
    <td class="lesson-cell">${item.lesson}</td><td><span class="record-type-tag ${item.lotteryType}">${typeText(item.lotteryType)}</span></td><td>${item.lotteryId}</td><td>${item.lotteryName}</td><td>${item.role}</td><td>${item.initiator}</td><td>${item.student}</td><td>${item.studentId}</td><td>${item.renewed}</td><td>${item.prizeType}</td><td>${item.prizeName}</td><td>${item.wonAt}</td><td>${item.delivery ? `<button type="button" class="delivery-link">${item.delivery}</button>` : ''}</td>
  </tr>`).join('') || '<tr><td colspan="13" class="empty">暂无符合条件的中奖记录</td></tr>';
}

function relationCount(id) { return state.relations.filter(r => r.a === id || r.b === id).length; }
function renderList() {
  const keyword = $('#activityKeyword').value.trim().toLowerCase();
  const rows = state.activities.filter(item => !keyword || `${item.name}${item.id}`.toLowerCase().includes(keyword));
  $('#activityCount').textContent = `共 ${rows.length === 10 ? 54 : rows.length} 条`;
  $('#activityListBody').innerHTML = rows.map(item => `<tr data-activity-row="${item.id}">
    <td>${item.id}</td><td>${item.name}</td><td><span class="list-type-text">${listTypeText(item.type)}</span></td><td>${item.status}</td><td>${item.startEnd}</td><td>${item.updated}</td><td>${item.creator}</td><td>${item.modifier}</td>
    <td class="admin-row-actions"><button class="offline">下架</button><button data-view-id="${item.id}">查看</button><button data-edit-id="${item.id}">修改</button>${item.type === 'post' ? `<button data-copy-link-id="${item.id}">复制链接</button>` : ''}<button data-copy-id="${item.id}">复制</button><button class="disabled-action">删除</button></td></tr>`).join('') || '<tr><td colspan="9" class="empty">没有符合条件的活动</td></tr>';
}

function renderClassDetail() {
  const item = activity(state.currentId);
  $('#classDetailName').textContent = item.name;
  $('#classDetailTime').textContent = item.startEnd;
  $('#classPrizeBody').innerHTML = prizes.map(p => `<tr><td>${p.name}</td><td>${p.type}</td><td><img class="prize-thumb" src="${p.image}" alt="${p.name}"></td><td>${p.mode === 'fixed' ? p.value : '不固定'}</td><td>${p.mode === 'ratio' ? `${p.value}%` : '--'}</td><td>${p.mode === 'fixed' ? p.value : '--'}</td></tr>`).join('');
  const rows = state.relations.filter(r => r.a === item.id || r.b === item.id);
  $('#classRelationBody').innerHTML = rows.map(rel => { const relation = relationForCurrent(rel); return `<tr><td><strong>${relation.other.name}</strong><small>${relation.other.id} · ${listTypeText(relation.other.type)}</small></td><td><span class="rule-pill ${relation.intoCurrent}">${ruleText(relation.intoCurrent)}</span></td><td><span class="rule-pill ${relation.intoOther}">${ruleText(relation.intoOther)}</span></td></tr>`; }).join('') || '<tr><td colspan="3" class="empty">暂无互斥规则</td></tr>';
}

function generateId() { return `A${new Date().toISOString().slice(0,10).replaceAll('-', '')}${String(state.activities.length + 1).padStart(3, '0')}`; }
function copyActivity(id) {
  const source = activity(id);
  if (!source) return;
  const copiedId = generateId();
  const copied = { ...source, id: copiedId, name: `${source.name}（复制）`, updated: '刚刚', status: '草稿', modifier: '当前用户' };
  state.activities.unshift(copied);
  state.currentId = copiedId;
  state.detailMode = 'edit';
  state.editType = null;
  renderList();
  switchView('detail');
  showToast(`已生成新活动 ${copiedId}，请确认抽奖类型后保存`);
}

function relationForCurrent(rel) {
  const currentIsA = rel.a === state.currentId; const otherId = currentIsA ? rel.b : rel.a;
  return { other: activity(otherId), intoCurrent: currentIsA ? rel.bToA : rel.aToB, intoOther: currentIsA ? rel.aToB : rel.bToA };
}
function renderRelations() {
  const current = activity(state.currentId);
  const currentType = state.detailMode === 'edit' && state.editType ? state.editType : current.type;
  const readOnly = currentType === 'class' || state.detailMode === 'view';
  const rows = state.relations.filter(r => r.a === state.currentId || r.b === state.currentId);
  $('#addRelationBtn').classList.toggle('hidden', readOnly);
  $('#relationActionHeader').classList.toggle('hidden', readOnly);
  $('#relationSectionSubtitle').textContent = readOnly ? '当前页面仅支持查看，请在课外抽奖编辑页修改' : '分别配置课中中奖后参与课外、课外中奖后参与课中的中奖限制';
  $('#relationBody').innerHTML = rows.map((rel, index) => { const item = relationForCurrent(rel); const actions = readOnly ? '' : `<td><button class="text-action" data-edit-relation="${index}">编辑</button><button class="text-action danger" data-remove-relation="${index}">删除</button></td>`; return `<tr><td><strong>${item.other.name}</strong><small>${item.other.id} · ${listTypeText(item.other.type)}</small></td><td><span class="rule-pill ${item.intoCurrent}">${ruleText(item.intoCurrent)}</span><small class="relation-direction-hint">课中抽奖 → 课外抽奖</small></td><td><span class="rule-pill ${item.intoOther}">${ruleText(item.intoOther)}</span><small class="relation-direction-hint">课外抽奖 → 课中抽奖</small></td>${actions}</tr>`; }).join('') || `<tr><td colspan="${readOnly ? 3 : 4}" class="empty">暂未配置互斥规则</td></tr>`;
}
function renderDetail() {
  const item = activity(state.currentId) || state.activities[0]; state.currentId = item.id;
  const readOnly = state.detailMode === 'view';
  const effectiveType = state.editType || item.type;
  $('#detailTitle').textContent = item.name; $('#detailId').textContent = `${item.id} · ${typeText(effectiveType)}`;
  $('#detailModeLabel').textContent = readOnly ? '查看抽奖' : '编辑抽奖';
  $('#detailNavTab').textContent = readOnly ? '查看抽奖' : '编辑抽奖';
  $('#editActivityName').value = item.name;
  $$('input[name="editLotteryType"]').forEach(input => { input.checked = input.value === effectiveType; });
  $('#editLotteryLink').value = `https://h5.xiaohe.com/lottery?activity_id=${encodeURIComponent(item.id)}`;
  $('#lotteryLinkRow').classList.toggle('hidden', !readOnly);
  $('#openStudentBtn').classList.toggle('hidden', effectiveType !== 'post');
  $('#saveEditTopBtn').classList.toggle('hidden', readOnly);
  $('#addPrizeBtn').classList.toggle('hidden', readOnly);
  $('#prizeActionHeader').classList.toggle('hidden', readOnly);
  $('#participantRow').classList.toggle('hidden', readOnly);
  $$('[data-type-section]').forEach(section => section.classList.toggle('hidden', section.dataset.typeSection !== effectiveType));
  if (readOnly) $('#participantRow').classList.add('hidden');
  $('.edit-footer').classList.toggle('hidden', readOnly);
  $$('#editActivityForm input, #editActivityForm select, #editActivityForm textarea').forEach(control => { control.disabled = readOnly; });
  const postType = effectiveType === 'post';
  $('#prizeQuantityHeader').textContent = postType ? '发放数量上限' : '奖品数量';
  $('#prizeProbabilityHeader').textContent = postType ? '中奖概率' : '中奖比例';
  $('#prizeVirtualHeader').classList.toggle('hidden', postType);
  $('#detailPrizeBody').innerHTML = prizes.map((p, index) => {
    const actions = readOnly ? '' : `<td><button type="button" class="text-action" data-edit-prize="${index}">编辑</button><button type="button" class="text-action danger" data-delete-prize="${index}">删除</button></td>`;
    if (postType) {
      const cap = p.cap === null || p.cap === undefined ? '不限量' : `${p.cap}份`;
      const probability = `${p.probability ?? (p.mode === 'ratio' ? p.value : 0)}%`;
      return `<tr><td><strong>${p.name}</strong></td><td>${p.type}</td><td><img class="prize-thumb" src="${p.image}" alt="${p.name}"></td><td>${cap}</td><td>${probability}</td><td class="hidden">${p.virtual}</td>${actions}</tr>`;
    }
    return `<tr><td><strong>${p.name}</strong></td><td>${p.type}</td><td><img class="prize-thumb" src="${p.image}" alt="${p.name}"></td><td>${p.mode === 'fixed' ? `${p.value}个` : '不固定'}</td><td>${p.mode === 'ratio' ? `${p.value}%` : '—'}</td><td>${p.virtual}</td>${actions}</tr>`;
  }).join('');
  renderRelations();
}

function syncPrizeModalForType() {
  const postType = (state.editType || activity(state.currentId)?.type) === 'post';
  $('#postPrizeRules').classList.toggle('hidden', !postType);
  $$('.class-prize-rule').forEach(el => el.classList.toggle('hidden', postType));
  $('#newPrizeType').disabled = false;
  if (postType) {
    $('#newPrizeProbability').required = true;
    $('#newPrizeValue').required = false;
  } else {
    $('#newPrizeProbability').required = false;
    $('#newPrizeValue').required = true;
  }
}

function openPrizeEditor(index = -1) {
  editingPrizeIndex = index;
  const prize = index >= 0 ? prizes[index] : null;
  $('#prizeForm').reset();
  $('#newPrizeName').value = prize?.name || '';
  $('#newPrizeType').value = prize?.type && [...$('#newPrizeType').options].some(option => option.value === prize.type) ? prize.type : '实物';
  $('#newPrizeDesc').value = prize?.description || (isDigitalPrizeType(prize?.type) ? '请在小盒课堂相应账户中查看或使用' : '实物奖品请联系辅导老师领取');
  $('#newPrizePreview').src = prize?.image || 'assets/prize-projector.png';
  const postType = (state.editType || activity(state.currentId)?.type) === 'post';
  if (postType) {
    $('#newPrizeProbability').value = prize?.probability ?? (prize?.mode === 'ratio' ? prize.value : 10);
    $('#newPrizeCap').value = prize?.cap ?? '';
    $('#newPrizeUnlimited').checked = prize ? (prize.cap === null || prize.cap === undefined) : isDigitalPrizeType($('#newPrizeType').value);
    $('#newPrizeCap').disabled = $('#newPrizeUnlimited').checked;
  } else {
    const mode = prize?.mode || 'ratio';
    const radio = $(`input[name="prizeMode"][value="${mode}"]`);
    if (radio) radio.checked = true;
    $('#newPrizeValue').value = prize?.value ?? 30;
    $('#newPrizeUnit').textContent = mode === 'fixed' ? '个' : '%';
  }
  $('#prizeModal .modal-header h2').textContent = index >= 0 ? '编辑奖品' : '添加奖品';
  syncPrizeModalForType();
  openModal('prizeModal');
}

function renderRelationSearchResults(query = '') {
  const keyword = query.trim().toLowerCase();
  const matches = relationCandidates.filter(item => !keyword || `${item.name} ${item.id}`.toLowerCase().includes(keyword));
  $('#relationActivityResults').innerHTML = matches.length ? matches.map(item => `<button type="button" role="option" data-relation-activity="${item.id}"><strong>${item.name}</strong><small>${item.id} · ${typeText(item.type)}</small></button>`).join('') : '<div class="activity-picker-empty">未找到可添加的互斥抽奖</div>';
  $('#relationActivityResults').classList.add('open');
}
function selectRelationActivity(id) {
  const item = relationCandidates.find(candidate => candidate.id === id);
  if (!item) return;
  $('#relationActivity').value = item.id;
  $('#relationActivitySearch').value = `${item.name}（${item.id}）`;
  $('#relationActivityResults').classList.remove('open');
}
function openRelationModal() {
  relationCandidates = state.activities.filter(item => item.type === 'class' && item.id !== state.currentId && !state.relations.some(r => (r.a === state.currentId && r.b === item.id) || (r.b === state.currentId && r.a === item.id)));
  if (!relationCandidates.length) return showToast('当前抽奖已与列表内其他抽奖全部配置互斥规则');
  $('#relationActivity').value = '';
  $('#relationActivitySearch').value = '';
  $('#relationIntoCurrent').value = 'none';
  $('#relationIntoOther').value = 'none';
  openModal('relationModal');
  renderRelationSearchResults();
  $('#relationActivitySearch').focus();
}

function renderWheel() {
  const slotCount = Math.max(6, prizes.length);
  const step = 360 / slotCount;
  const colors = ['#fff2c9', '#ffc866'];
  $('#wheel').style.background = `conic-gradient(from ${-step / 2}deg,${Array.from({ length: slotCount }, (_, i) => `${colors[i % colors.length]} ${i * step}deg ${(i + 1) * step}deg`).join(',')})`;
  $('#wheelLabels').innerHTML = Array.from({ length: slotCount }, (_, i) => {
    const prize = prizes[i % prizes.length];
    const angle = (i * step - 90) * Math.PI / 180;
    return `<div class="wheel-label" style="left:calc(50% + ${Math.cos(angle) * 91}px);top:calc(50% + ${Math.sin(angle) * 91}px)"><img src="${prize.image}" alt=""><span>${prize.name.replace(/.*·/,'')}</span></div>`;
  }).join('');
  $('#wheelLights').innerHTML = Array.from({ length: 18 }, (_, i) => `<i style="transform:translate(-50%,-50%) rotate(${i * 20}deg) translateY(-146px)"></i>`).join('');
}
function renderStudent() {
  $$('.lottery-state').forEach(el => el.classList.remove('active'));
  const eligibilityViews = { expired: '#expiredLotteryState', ineligible: '#ineligibleLotteryState', not_started: '#notStartedLotteryState', auth_required: '#authRequiredLotteryState' };
  const stateView = $(eligibilityViews[state.activityEligibility] || '#activeLotteryState');
  stateView.classList.add('active');
  const restricted = state.classLotteryStatus.startsWith('won_');
  const participated = state.participationStatus === 'participated';
  const offClassResultText = ({ physical_pending: '实物奖·待填地址', physical_filled: '实物奖·已填地址', virtual: '虚拟奖', no_win: '未中奖' })[state.lotteryOutcome];
  $('#summaryRuleLabel').textContent = state.activityEligibility !== 'valid' ? '当前状态' : participated ? '课外抽奖结果' : restricted ? '本次中奖资格' : '开奖方式';
  const eligibilityText = { expired: '链接失效', ineligible: '无参与资格', not_started: '活动未开始', auth_required: '待身份校验' };
  $('#summaryRuleValue').textContent = eligibilityText[state.activityEligibility] || (participated ? offClassResultText : restricted ? '可参与·不可再中奖' : '随机中奖');
  $('#studentActivityTitle').textContent = activity(state.currentId)?.name || '幸运抽奖活动';
  const saleTarget = selectedSalesLink();
  $('#salesLinkSelectionHint').textContent = saleTarget ? `将跳转：${saleTarget.className}报名页${state.salesLinkStatus === 'multiple' ? '（抽奖范围内顺序第1）' : ''}` : '没有可用报名页，不展示转化入口';
  $('#studentLotteryCta').classList.toggle('used', participated);
  $('#studentLotteryCta').setAttribute('aria-disabled', String(participated));
  $('#spinButton').classList.toggle('used', participated);
  $('#spinButton').setAttribute('aria-disabled', String(participated));
  renderFloatingRecordEntry();
  showStudentScreen('lottery');
  renderWheel();
  renderOutcomeControl();
  renderWinningRecord();
}
function showStudentResult() {
  const restricted = state.classLotteryStatus.startsWith('won_');
  const result = restricted ? 'no_win' : selectedDrawResult();
  const noWin = result === 'no_win';
  const physical = result === 'physical';
  const virtual = result === 'virtual';
  $('#studentResult').classList.toggle('no-win', noWin);
  $('#resultBadge').textContent = noWin ? '抽奖结果' : '中奖啦';
  $('#resultTitle').textContent = noWin ? '谢谢参与' : physical ? '投影仪' : '专注之星勋章';
  $('#resultDescription').textContent = noWin ? '差一点！很抱歉你与奖品失之交臂' : physical ? '请在活动结束前填写收货地址' : '虚拟奖品将自动发放到你的账号';
  $('#resultImage').src = physical ? 'assets/prize-projector.png' : 'assets/prize-robot.png';
  $('#resultImage').alt = physical ? '投影仪' : '专注之星勋章';
  $('#resultDescription').classList.remove('hidden');
  $('#addressBtn').classList.toggle('hidden', !physical);
  // 课中已有中奖记录且本次课外未中奖时，不再重复引导查看中奖记录。
  $('#recordBtn').classList.toggle('hidden', !(virtual || (restricted && !noWin)));
  $('#resultDeadline').classList.toggle('hidden', !physical);
  $('#courseBtn').classList.toggle('hidden', state.formalCourseStatus !== 'not_enrolled' || !selectedSalesLink());
  renderFloatingRecordEntry();
  openModal('resultModal');
}
function showUsedChanceModal() {
  const needsAddress = currentOffClassStatus() === 'physical_pending' || (state.spun && selectedDrawResult() === 'physical' && !state.classLotteryStatus.startsWith('won_'));
  state.usedChanceAction = needsAddress ? 'address' : 'records';
  $('#usedChanceAction').textContent = needsAddress ? '填写收货地址' : '查看中奖记录';
  openModal('usedChanceModal');
}
function spin() {
  if (state.activityEligibility !== 'valid') return;
  if (state.participationStatus === 'participated' || state.spun) return showUsedChanceModal();
  const btn=$('#spinButton'); btn.disabled=true; state.rotation += 1600; $('#wheel').style.transform=`rotate(${state.rotation}deg)`;
  setTimeout(()=>{ btn.disabled=false; state.spun=true; showStudentResult(); }, 4100);
}
function resetStudentResult() { state.spun=false; state.rotation=0; $('#wheel').style.transform='rotate(0deg)'; closeModal('resultModal'); closeModal('usedChanceModal'); renderFloatingRecordEntry(); }

function renderFloatingRecordEntry() {
  const hasOffClassResult = state.participationStatus === 'participated' || state.spun;
  $('#floatingRecordEntry').classList.toggle('hidden', !hasOffClassResult || state.activityEligibility !== 'valid');
}

function showStudentScreen(screen) {
  state.studentScreen = screen;
  $('.student-page').classList.toggle('hidden', screen !== 'lottery');
  $$('.student-subpage').forEach(page => page.classList.toggle('active', page.id === screen));
  $('.phone-screen').classList.toggle('light-screen', screen !== 'lottery');
}

function openLotteryRules() {
  state.rulesReturnScreen = state.studentScreen === 'lotteryRulesPage' ? 'lottery' : state.studentScreen;
  closeModal('resultModal');
  closeModal('usedChanceModal');
  showStudentScreen('lotteryRulesPage');
}

function applyDeliveryAddress(name, phone, detail) {
  $('#recordAddressName').textContent = name;
  $('#recordAddressPhone').textContent = phone;
  $('#recordAddressDetail').textContent = detail;
  if (state.classLotteryStatus === 'won_physical_pending') state.classLotteryStatus = 'won_physical_filled';
  if (currentOffClassStatus() === 'physical_pending' || (state.participationStatus === 'not_joined' && selectedDrawResult() === 'physical')) {
    state.participationStatus = 'participated';
    state.lotteryOutcome = 'physical_filled';
  }
  renderScenarioControls();
  renderWinningRecord();
  showStudentScreen('winningRecordsPage');
}

function openAddressPage() {
  closeModal('resultModal');
  closeModal('usedChanceModal');
  showStudentScreen('addressPage');
}

function openWinningRecords() {
  closeModal('resultModal');
  closeModal('usedChanceModal');
  showStudentScreen('winningRecordsPage');
}

function openCourseSignup() {
  const target = selectedSalesLink();
  if (!target || state.formalCourseStatus !== 'not_enrolled') return;
  $('#courseSignupClass').textContent = target.className;
  $('#courseSignupUrl').textContent = target.url;
  closeModal('resultModal');
  showStudentScreen('courseSignupPage');
}

function renderScenarioControls() {
  $$('.student-scenario-control').forEach(group => {
    const field = group.dataset.field;
    $$('button', group).forEach(button => button.classList.toggle('active', button.dataset.value === state[field]));
  });
  renderOutcomeControl();
}

function renderOutcomeControl() {
  const participated = state.participationStatus === 'participated';
  const labels = participated
    ? { physical_pending: '实物奖·待填地址', physical_filled: '实物奖·已填地址', virtual: '虚拟奖', no_win: '未中奖' }
    : { physical_pending: '中实物奖', virtual: '中虚拟奖', no_win: '未中奖' };
  $$('#lotteryOutcomeControl button').forEach(button => {
    const isFilledAddress = button.dataset.value === 'physical_filled';
    button.classList.toggle('hidden', isFilledAddress && !participated);
    if (labels[button.dataset.value]) button.textContent = labels[button.dataset.value];
  });
}

function currentWinningRecord() {
  const offClassStatus = currentOffClassStatus();
  if (offClassStatus === 'physical_pending') return { source: 'post', type: 'physical', address: 'pending' };
  if (offClassStatus === 'physical_filled') return { source: 'post', type: 'physical', address: 'filled' };
  if (offClassStatus === 'virtual') return { source: 'post', type: 'virtual' };
  if (state.classLotteryStatus === 'won_physical_pending') return { source: 'class', type: 'physical', address: 'pending' };
  if (state.classLotteryStatus === 'won_physical_filled') return { source: 'class', type: 'physical', address: 'filled' };
  if (state.classLotteryStatus === 'won_virtual') return { source: 'class', type: 'virtual' };
  if (state.spun && selectedDrawResult() === 'physical') return { source: 'post', type: 'physical', address: 'pending' };
  if (state.spun && selectedDrawResult() === 'virtual') return { source: 'post', type: 'virtual' };
  return null;
}

function renderWinningRecord() {
  const record = currentWinningRecord() || { source: 'class', type: 'virtual' };
  const physical = record.type === 'physical';
  const pending = physical && record.address === 'pending';
  $('#primaryWinningRecord').classList.toggle('physical-record', physical);
  $('#primaryWinningRecord').classList.toggle('address-filled', physical && !pending);
  $('#primaryRecordImage').src = physical ? 'assets/prize-projector.png' : 'assets/prize-robot.png';
  $('#primaryRecordImage').alt = physical ? '投影仪' : '专注之星勋章';
  $('#primaryRecordTitle').textContent = physical ? '投影仪' : '专注之星勋章';
  $('#primaryRecordSource').textContent = record.source === 'class' ? '课中抽奖' : '课外抽奖';
  $('#primaryRecordSource').className = `lottery-source-tag ${record.source}`;
  $('#primaryRecordDescription').textContent = physical ? (pending ? '请在活动结束前填写收货地址' : '收货地址已提交，可在失效前修改') : '虚拟权益已发放，请前往对应页面查看';
  $('#recordAddress').classList.toggle('hidden', !physical || pending);
  $('#recordAddressAction').classList.toggle('hidden', !pending);
  $('#editRecordAddress').classList.toggle('hidden', !physical || pending);
}

$$('.view-tab').forEach(btn => btn.addEventListener('click', () => switchView(btn.dataset.view)));
['teacherLotteryTypeFilter', 'teacherPrizeTypeFilter', 'teacherLessonFilter'].forEach(id => $(`#${id}`).addEventListener('change', renderTeacherRecords));
$('#teacherStudentFilter').addEventListener('input', renderTeacherRecords);
$('#exportTeacherRecords').addEventListener('click', () => showToast('中奖记录已按当前筛选条件导出'));
$('#copyTeacherLotteryLink').addEventListener('click', openTeacherLotteryLinkPicker);
$('#confirmTeacherLotteryLink').addEventListener('click', () => { const selected = $('input[name="teacherLotteryLinkActivity"]:checked'); if (!selected) return showToast('请先选择一个课外抽奖活动'); closeModal('teacherLotteryLinkModal'); copyLotteryLink(selected.value); });
$('#teacherRecordsBody').addEventListener('click', e => { if (e.target.classList.contains('delivery-link')) showToast('已打开学生收货信息'); });
$('#activityListBody').addEventListener('click', e => { if (e.target.dataset.viewId) { state.currentId=e.target.dataset.viewId; state.editType = null; state.detailMode = 'view'; switchView(activity(state.currentId).type === 'class' ? 'classDetail' : 'detail'); } if (e.target.dataset.editId) { state.currentId=e.target.dataset.editId; if (activity(state.currentId).type === 'class') return showToast('课中抽奖修改沿用原有页面，本 Demo 重点展示查看页'); state.editType = null; state.detailMode = 'edit'; switchView('detail'); } if (e.target.dataset.copyLinkId) copyLotteryLink(e.target.dataset.copyLinkId); if (e.target.dataset.copyId) copyActivity(e.target.dataset.copyId); });
$('#searchBtn').addEventListener('click', renderList);
$('#backFromClassDetail').addEventListener('click', () => switchView('list'));
$('#createBtn').addEventListener('click', () => {
  const id = generateId();
  state.activities.unshift({ id, name: '未命名课外抽奖', type: 'post', scope: '待选择课程/班级', status: '草稿', startEnd: '待设置 - 待设置', updated: '刚刚', creator: '当前用户', modifier: '当前用户' });
  state.currentId = id;
  state.detailMode = 'edit';
  state.editType = null;
  renderList();
  switchView('detail');
  showToast(`已创建课外抽奖 ${id}，可复制抽奖链接`);
});
$('#backToList').addEventListener('click', () => { state.editType = null; switchView('list'); }); $('#copyCurrentBtn').addEventListener('click', () => copyActivity(state.currentId));
$('#openStudentBtn').addEventListener('click', () => switchView('student'));
$$('input[name="editLotteryType"]').forEach(input => input.addEventListener('change', e => {
  const current = activity(state.currentId);
  if (!current || state.detailMode === 'view') return;
  state.editType = e.target.value;
  renderDetail();
  showToast(`已切换为${typeText(state.editType)}，下方配置模块已更新`);
}));
$('#addRelationBtn').addEventListener('click', openRelationModal);
$('#relationActivitySearch').addEventListener('input', e => { $('#relationActivity').value = ''; renderRelationSearchResults(e.target.value); });
$('#relationActivitySearch').addEventListener('focus', e => renderRelationSearchResults(e.target.value));
$('#relationActivityResults').addEventListener('click', e => { const option = e.target.closest('[data-relation-activity]'); if (option) selectRelationActivity(option.dataset.relationActivity); });
$('#relationForm').addEventListener('submit', e => { e.preventDefault(); const relatedId = $('#relationActivity').value; if (!relatedId) return showToast('请先查询并选择一个互斥抽奖'); state.relations.push({ a: relatedId, b: state.currentId, aToB: $('#relationIntoCurrent').value, bToA: $('#relationIntoOther').value }); closeModal('relationModal'); renderRelations(); renderList(); showToast('抽奖互斥规则已保存'); });
$('#relationBody').addEventListener('click', e => { const index=Number(e.target.dataset.removeRelation); if (!Number.isNaN(index) && e.target.dataset.removeRelation !== undefined) { const matches=state.relations.filter(r=>r.a===state.currentId||r.b===state.currentId); state.relations=state.relations.filter(r=>r!==matches[index]); renderRelations(); renderList(); showToast('抽奖互斥规则已删除'); } if (e.target.dataset.editRelation !== undefined) showToast('可分别修改两项互斥限制'); });
$$('[data-close]').forEach(btn => btn.addEventListener('click', () => closeModal(btn.dataset.close)));
$$('.modal-backdrop').forEach(el => el.addEventListener('click', e => { if (e.target===el) closeModal(el.id); }));
$('#editActivityForm').addEventListener('submit', e => { e.preventDefault(); const current = activity(state.currentId); current.type = state.editType || current.type; state.editType = null; current.name = $('#editActivityName').value.trim() || current.name; current.updated = '刚刚'; renderList(); $('#detailTitle').textContent = current.name; showToast('抽奖活动已保存'); });
$('#saveEditTopBtn').addEventListener('click', () => $('#editActivityForm').requestSubmit());
$('#copyLotteryLinkBtn').addEventListener('click', () => copyLotteryLink(state.currentId));
$('#cancelEditBtn').addEventListener('click', () => { state.editType = null; switchView('list'); });
$('#addPrizeBtn').addEventListener('click', () => openPrizeEditor());
$$('input[name="prizeMode"]').forEach(input => input.addEventListener('change', e => { $('#newPrizeUnit').textContent = e.target.value === 'fixed' ? '个' : '%'; }));
$('#newPrizeUnlimited').addEventListener('change', e => { $('#newPrizeCap').disabled = e.target.checked; if (e.target.checked) $('#newPrizeCap').value = ''; });
$('#newPrizeType').addEventListener('change', e => {
  if (isDigitalPrizeType(e.target.value)) {
    $('#newPrizeDesc').value = '请在小盒课堂相应账户中查看或使用';
    $('#newPrizeUnlimited').checked = true;
    $('#newPrizeCap').disabled = true;
  } else {
    $('#newPrizeDesc').value = '实物奖品请联系辅导老师领取';
    $('#newPrizeUnlimited').checked = false;
    $('#newPrizeCap').disabled = false;
  }
});
$('#prizeForm').addEventListener('submit', e => {
  e.preventDefault();
  const postType = (state.editType || activity(state.currentId)?.type) === 'post';
  const type = $('#newPrizeType').value;
  let nextPrize;
  if (postType) {
    const probability = Number($('#newPrizeProbability').value);
    const cap = $('#newPrizeUnlimited').checked ? null : Number($('#newPrizeCap').value);
    const existingProbability = prizes.reduce((sum, prize, index) => index === editingPrizeIndex ? sum : sum + Number(prize.probability ?? (prize.mode === 'ratio' ? prize.value : 0)), 0);
    if (!Number.isFinite(probability) || probability < 0 || probability > 100) return showToast('中奖概率需在0到100%之间');
    if (existingProbability + probability > 100) return showToast('所有奖品中奖概率合计不能超过100%');
    if (type === '实物' && !$('#newPrizeUnlimited').checked && (!Number.isInteger(cap) || cap < 1)) return showToast('请输入实物奖品发放数量上限');
    nextPrize = { name: $('#newPrizeName').value.trim(), type, image: $('#newPrizePreview').src, mode: 'ratio', value: probability, probability, cap, description: $('#newPrizeDesc').value.trim(), virtual: '否' };
  } else {
    const mode = $('input[name="prizeMode"]:checked').value;
    const value = Number($('#newPrizeValue').value);
    nextPrize = { name: $('#newPrizeName').value.trim(), type, image: $('#newPrizePreview').src, mode, value, probability: mode === 'ratio' ? value : 0, cap: mode === 'fixed' ? value : null, description: $('#newPrizeDesc').value.trim(), virtual: '否' };
  }
  if (!nextPrize.name) return showToast('请输入奖品名称');
  if (editingPrizeIndex >= 0) prizes[editingPrizeIndex] = nextPrize; else prizes.push(nextPrize);
  closeModal('prizeModal'); renderDetail(); showToast(editingPrizeIndex >= 0 ? '奖品已更新' : '奖品已添加'); editingPrizeIndex = -1;
});
$('#detailPrizeBody').addEventListener('click', e => { if (e.target.dataset.editPrize !== undefined) openPrizeEditor(Number(e.target.dataset.editPrize)); if (e.target.dataset.deletePrize !== undefined) { if (prizes.length === 1) return showToast('至少保留1个奖品'); prizes.splice(Number(e.target.dataset.deletePrize), 1); renderDetail(); showToast('奖品已删除'); } });
$$('.student-scenario-control').forEach(group => group.addEventListener('click', e => {
  const button = e.target.closest('button[data-value]');
  if (!button) return;
  state[group.dataset.field] = button.dataset.value;
  if (group.dataset.field === 'participationStatus' && state.participationStatus === 'not_joined' && state.lotteryOutcome === 'physical_filled') state.lotteryOutcome = 'physical_pending';
  resetStudentResult();
  renderScenarioControls();
  renderStudent();
}));
$('#spinButton').addEventListener('click', spin); $('#studentLotteryCta').addEventListener('click', spin); $('#resetLotteryBtn').addEventListener('click', () => { resetStudentResult(); showToast('本次结果已重置'); });
$('#addressBtn').addEventListener('click', openAddressPage);
$('#recordBtn').addEventListener('click', openWinningRecords);
$('#courseBtn').addEventListener('click', openCourseSignup);
$('#courseSignupSubmit').addEventListener('click', () => showToast('已进入对应班级报名流程'));
$$('[data-open-rules]').forEach(button => button.addEventListener('click', openLotteryRules));
$('#backFromRules').addEventListener('click', () => showStudentScreen(state.rulesReturnScreen || 'lottery'));
$('#usedChanceAction').addEventListener('click', () => { if (state.usedChanceAction === 'address') openAddressPage(); else openWinningRecords(); });
$('#floatingRecordEntry').addEventListener('click', openWinningRecords);
$$('[data-student-back]').forEach(button => button.addEventListener('click', () => showStudentScreen('lottery')));
$('#addAddressBtn').addEventListener('click', () => showStudentScreen('addressFormPage'));
$('#backToAddressList').addEventListener('click', () => showStudentScreen('addressPage'));
$$('.address-option').forEach(option => option.addEventListener('click', () => applyDeliveryAddress(option.dataset.addressName, option.dataset.addressPhone, option.dataset.addressDetail)));
$('#studentAddressForm').addEventListener('submit', event => { event.preventDefault(); applyDeliveryAddress($('#recipientName').value.trim(), $('#recipientPhone').value.trim(), `${$('#recipientRegion').value.trim()} ${$('#recipientDetail').value.trim()}`); });
$('#editRecordAddress').addEventListener('click', () => showStudentScreen('addressPage'));
$('#recordAddressAction').addEventListener('click', () => showStudentScreen('addressPage'));
$$('.record-action').forEach(button => button.addEventListener('click', () => showToast('已打开对应奖品查看页面')));

renderList(); renderDetail(); renderStudent();
