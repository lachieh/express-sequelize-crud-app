$(document).ready(() => {
    console.log('success!');

    $('.example-submit').click(function() {
        $.post('/api/post', {
            title: 'Example Content from the button',
            content: 'some example content'
        }, function(data) {
            console.log(data);
        })
    })
})
