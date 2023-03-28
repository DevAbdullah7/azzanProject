function langRadiosHandel(clecked) {
    const radioArabic = document.getElementById('radioArabic')
    const radioEnglish = document.getElementById('radioEnglish')
    
    if (clecked.id == radioArabic.id) {
        radioEnglish.checked = false
        window.localStorage.setItem('lang', 'arabic');
        document.querySelector('body').classList.remove('english')
        document.querySelector('body').classList.add(localStorage.valueOf('lang').lang)
    } else if (clecked.id == radioEnglish.id) {
        radioArabic.checked = false
        window.localStorage.setItem('lang', 'english');
        document.querySelector('body').classList.remove('arabic')
        document.querySelector('body').classList.add(localStorage.valueOf('lang').lang)
    }
}