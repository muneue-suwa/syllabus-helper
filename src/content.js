const targetButton =
  document.getElementById('ctl00_phContents_ctl18_btnSearch');
const classNumberForm =
  document.getElementById('ctl00_phContents_txt_lctCd_Search');
// 日本語と英語の判定: 1 means Japanese, 2 means English.
let jeCd = 1;

if (targetButton != null && classNumberForm != null) {
  // 検索ボタンが英語（Search）の場合，英語のシラバス検索と判定する
  if (targetButton.value === 'Search') {
    jeCd = 2;
  }

  // 講義番号の入力を強制的に半角数字にする
  classNumberForm.setAttribute('type', 'number');

  // Enter keyが押されたら，検索ボタンをクリックする
  document.addEventListener('keypress', function(event) {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      if (classNumberForm.value != '') {
        // 講義番号が入力されている場合は，講義番号からシラバスを直接開く
        openSyllabus(classNumberForm.value);
      } else {
        // 講義番号が入力されていない場合は，検索ボタンをクリックする
        targetButton.click();
      }
    }
  });
}

/**
 * シラバスのページを新しいタブで開く
 * @param {number} classNumber class number
 */
function openSyllabus(classNumber) {
  const today = new Date();
  const year = today.getFullYear();
  const targetURL =
    `https://kyomu.adm.okayama-u.ac.jp/Portal/Public/Syllabus/DetailMain.aspx?lct_year=${year}&lct_cd=${year}${classNumber}&je_cd=${jeCd}`;
  window.open(targetURL);
}
