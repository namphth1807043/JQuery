var validator = $('#song-form').validate({
    rules: {
        name: {
            required: true,
            minlength: 2,
            maxlength: 15
        },
        singer: {
            required: true,
            minlength: 2,
            maxlength: 15
        },
        author: {
            required: true,
            minlength: 2,
            maxlength: 15
        },
        thumbnail: {
            required: true,
        },
        link: {
            required: true
        },
    },
    messages: {
        name: {
            required: 'Vui lòng nhập tên của bài hát.',
            minlength: 'Tên quá ngắn, vui lòng nhập ít nhất {0} ký tự',
            maxlength: 'Tên quá dài, vui lòng nhập nhiều nhất {0} ký tự',
        },
        singer: {
            required: 'Vui lòng nhập tên ca sỹ.',
            minlength: 'Tên quá ngắn, vui lòng nhập ít nhất {0} ký tự',
            maxlength: 'Tên quá dài, vui lòng nhập nhiều nhất {0} ký tự',
        },
        author: {
            required: 'Vui lòng nhập tên tác giả.',
            minlength: 'Tên quá ngắn, vui lòng nhập ít nhất {0} ký tự',
            maxlength: 'Tên quá dài, vui lòng nhập nhiều nhất {0} ký tự',
        },
        thumbnail: {
            required: 'Vui lòng nhập link ảnh của bài hát.',
        },
        link: {
            required: 'Vui lòng nhập link bài hát.',
        }
    },
    submitHandler: function (form, event) {
        event.preventDefault();
        var senderSaveObject = {
            name: $(form["name"]).val(),
            singer: $(form["singer"]).val(),
            author: $(form["author"]).val(),
            thumbnail: $(form["thumbnail"]).val(),
            link: $(form["link"]).val(),
        };
        $.ajax(
            {
                url: CREATE_SONG_API,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                Authorization: "Basic " + localStorage.getItem('token-key'),
                beforeSend: function (xhr) {
                    /* Authorization header */
                    xhr.setRequestHeader("Authorization", "Basic " +localStorage.getItem('token-key'));
                },
                data: JSON.stringify(senderSaveObject),
                success: function (data, textStatus, jqXHR) {
                    console.log('success');
                    console.log(data);
                    console.log('-----');
                    console.log(data.responseText);
                    console.log('-----');
                    console.log(textStatus);
                    console.log('-----');
                    console.log(jqXHR);
                    alert(`Lưu thành công bài hát ${data.name}`);
                    $('#upload-modal').modal('hide');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('error');
                    console.log(jqXHR);
                    console.log('-----');
                    console.log(jqXHR.responseText);
                    console.log('-----');
                    console.log(jqXHR.responseJSON.error);
                    console.log('-----');
                    console.log(textStatus);
                    console.log('-----');
                    console.log(errorThrown);
                    alert('This page required logged in to continue!');
                    $('#upload-modal').modal('hide');
                    $('#login-modal').modal('show');
                }
            }
        );
        return false;
    }
});



