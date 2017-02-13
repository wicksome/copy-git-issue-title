(function($) {
    'use strict';

    const getCommitTitle = function() {
        const repoPath = $('.zh-issueviewer-repopath:first');

        let issue;
        if (!repoPath.empty()) {
            issue = repoPath.html().trim();
        } else {
            var match = /\/(.*)\/issues\/(\d*)/.exec(window.location.pathname);
            issue = `${match[1]}#${match[2]}`;
        }
        var title = $('#js-repo-pjax-container .js-issue-title:first').text().trim();

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
            console.info('Action:', e.action);
            console.info('Text:', e.text);
            console.info('Trigger:', e.trigger);

            e.clearSelection();
        });

        copyBtn.on('error', function(e) {
            console.error('Action:', e.action);
            console.error('Trigger:', e.trigger);
        });
    };

    addCopyButton();
    setInterval(addCopyButton, 1000);
})(jQuery);
