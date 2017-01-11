(function() {

    function toggleNavigation(event) {
        event.stopPropagation();

        if (navigationIsOpen()) {
            closeNavigation();
        } else {
            openNavigation();
        }
    }

    function navigationIsOpen() {
        return site.classList.contains('site-navigation-open');
    }

    function closeNavigation() {
        if (navigationIsOpen()) {
            site.classList.remove('site-navigation-open');

            setTimeout(function() {
                siteNavigation.style.display = '';
            }, 200);
        }
    }

    function openNavigation() {
        if (! navigationIsOpen()) {
            siteNavigation.style.display = 'block';

            setTimeout(function() {
                site.classList.add('site-navigation-open');
                siteNavigation.focus();
            }); // wait just 1 tick
        }
    }

    function escapeNavigation(event) {
        if (event.key == 'Escape') {
            closeNavigation();
        }
    }

    function validateFormControl(event) {
        var error = false;

        // check if filled
        if (event.target.value.length) {
            event.target.classList.add('filled');
        } else {
            event.target.classList.remove('filled');
        }

        // check if required and empty
        if (! event.target.value.length && event.target.hasAttribute('required')) {
            error = true;
        }

        // validate postal code
        if (event.target.value.length && event.target.id == 'postal-code' && ! validatePostalCode(event.target.value)) {
            error = true;
        }

        if (error) {
            event.target.classList.add('error');
            event.target.classList.remove('valid');
        } else {
            event.target.classList.remove('error');
            event.target.classList.add('valid');
        }
    }

    // http://stackoverflow.com/questions/15774555/efficient-regex-for-canadian-postal-code-function
    function validatePostalCode(postalCode) {
        var postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
        return postalCodeRegex.test(postalCode);
    }

    function togglePostalCode(event) {
        if (event.target.value == 'Canada') {
            formGroupPostalCode.classList.remove('hidden');
            formControlPostalCode.removeAttribute('disabled');
        } else {
            formGroupPostalCode.classList.add('hidden');
            formControlPostalCode.setAttribute('disabled', '');
        }
    }

    function formSubmission(event) {
        event.preventDefault();
        form.classList.add('hidden');
        formLoader.classList.remove('hidden');

        setTimeout(function() {
            formLoader.classList.add('hidden');
            formConfirmationMessage.classList.remove('hidden');
        }, 3000);
    }

    function resetForm() {
        form.reset();

        for (var i = 0; i < formControls.length; i++) {
            formControls[i].classList.remove('filled');
            formControls[i].classList.remove('error');
            formControls[i].classList.remove('valid');
        }

        formConfirmationMessage.classList.add('hidden');
        form.classList.remove('hidden');
        formControls[0].focus();
    }

    var site = document.documentElement,
        body = document.body,
        navigationToggle = document.getElementById('navigation-toggle'),
        siteNavigation = document.getElementById('site-navigation'),
        form = document.getElementById('form'),
        formConfirmationMessage = document.getElementById('form-confirmation-message'),
        formConfirmationMessageButton = document.getElementById('form-confirmation-message-button'),
        formLoader = document.getElementById('form-loader'),
        formGroupPostalCode = document.getElementById('form-group-postal-code'),
        formControls = document.getElementsByClassName('form-control'),
        formControlCountry = formControls['country'],
        formControlPostalCode = formControls['postal-code'];

    document.addEventListener('keydown', escapeNavigation);
    body.addEventListener('click', closeNavigation);
    navigationToggle.addEventListener('click', toggleNavigation);
    form.addEventListener('submit', formSubmission);
    formControlCountry.addEventListener('input', togglePostalCode);
    formConfirmationMessageButton.addEventListener('click', resetForm);

    for (var i = 0; i < formControls.length; i++) {
        formControls[i].addEventListener('input', validateFormControl);
    }

})();
