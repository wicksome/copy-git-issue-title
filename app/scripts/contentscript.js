(function($) {
    'use strict';

    const getCommitTitle = function() {
        var match = /\/(.*)\/issues\/(\d*)/.exec(window.location.pathname);

        const issue = `${match[1]}#${match[2]}`;
        const title = $('#js-repo-pjax-container .js-issue-title:first').text().trim();

        return `[${issue}] ${title}`;
    };

    const isIssuePage = function() {
        return /issues\/(\d+)$/.test(window.location.pathname);
    };

    const addCopyButton = function() {
        const $gitHeader = $('.gh-header-actions:first');

        if (!isIssuePage() || !$gitHeader || $gitHeader.find('.cp-btn-copy:first').length !== 0) {
            return;
        }

        var btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        btn.setAttribute('class', 'btn btn-sm cp-btn-copy');
        btn.setAttribute('data-clipboard-text', getCommitTitle());
        btn.innerHTML = 'Copy';

        $gitHeader.prepend(btn);
        const copyBtn = new Clipboard('.cp-btn-copy');

        copyBtn.on('success', function(e) {
            e.clearSelection();
            console.info('Action:', e.action);
            console.info('Text:', e.text);
            console.info('Trigger:', e.trigger);

            e.trigger.setAttribute('class', 'btn btn-sm cp-btn-copy tooltipped tooltipped-s');
            e.trigger.setAttribute('aria-label', 'Copied');
        });

        copyBtn.on('error', function(e) {
            console.error('Action:', e.action);
            console.error('Trigger:', e.trigger);
        });

        btn.addEventListener('mouseleave', function(e) {
            e.currentTarget.setAttribute('class', 'btn btn-sm cp-btn-copy');
            e.currentTarget.removeAttribute('aria-label');
        });
    };

    addCopyButton();
    setInterval(addCopyButton, 1000);
})(jQuery);
