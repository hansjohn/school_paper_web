root = 'http://127.0.0.1:5000'
var dialog = document.querySelector('dialog');
if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}
var boyButton = document.querySelector('#post_boy_paper_button');
boyButton.addEventListener('click', function () {
    window.isboy = true
    dialog.showModal();
});
var girlButton = document.querySelector('#post_girl_paper_button');
girlButton.addEventListener('click', function () {
    window.isboy = false
    dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', function () {
    dialog.close();
});
var post_button = document.querySelector('#post_button');
post_button.addEventListener('click', function () {
    var email = document.querySelector('#email').value
    var re = RegExp('[A-Z,a-z,0-9]*@stu.xmu.edu.cn')
    if (re.test(email) == false) {
        return
    }
    var code = document.querySelector('#code').value
    if (code == '' || code == null) {
        return
    }
    var paper_text = document.querySelector('#paper').value
    if (paper_text == '' || paper_text == null) {
        return
    }
    fetch(root + '/lovepaper', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'email': email,
            'code': code,
            'paper_text': paper_text
        })
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP 错误：${response.status}`);
            }
            return response.json();
        })
        .catch((err) => console.error(`Fetch 错误：${err.message}`));
})
