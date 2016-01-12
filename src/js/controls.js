document.addEventListener('keydown', e => {
    if (interrupt==true) return;
    if(e.keyCode==39&&postNum<posts.length-1) {
        getPost(++postNum)
    }
    else if (e.keyCode==37&&postNum>0) {
        getPost(--postNum)
    }
})