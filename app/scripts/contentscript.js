(function($) {
    'use strict';

    var copyIssusTitle = function() {
        const $container = $('#js-repo-pjax-container');

        var repoPath = $('.zh-issueviewer-repopath:first');
        if (!repoPath.empty()) {
            console.log(repoPath.html().trim());
        } else {
            var url = window.location.href;
            var issueTitle = $container.find('.js-issue-title').text().trim();
            console.log(url, issueTitle);
        }

    };

    var changeMergeButtonState = function() {
        var $gitHeader = $('.gh-header-meta:first');

        if ($gitHeader.find('.state').length === 1) {
            // var imgSrc = chrome.extension.getURL("flash.svg");
            var btnTpl = '<div class="state _btnCopyIssueTitle">Copy</dic>';
            $gitHeader.find('.state:first').after(btnTpl);

            $('._btnCopyIssueTitle:first').on('click', copyIssusTitle);
        }

        chrome.runtime.sendMessage({
            from: 'content',
            subject: 'localStorage'
        }, function(response) {
            if (!response) {
                return;
            }
        });
    };

    changeMergeButtonState();
    setInterval(changeMergeButtonState, 1000);
})(jQuery);
