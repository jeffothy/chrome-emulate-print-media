let mediaPrintTabs = new Set();

chrome.action.onClicked.addListener(async (tab) => {
  const currentTabId = tab.id;

  if (!mediaPrintTabs.has(currentTabId)) {
    chrome.debugger.attach({ tabId: currentTabId }, '1.2', function () {
      chrome.debugger.sendCommand(
        { tabId: currentTabId },
        'Emulation.setEmulatedMedia',
        { media: "print" }
      );
    });

    mediaPrintTabs.add(currentTabId);

    chrome.debugger.onDetach.addListener(function (source, reason) {
      const detachedTabId = source.tabId;
      mediaPrintTabs.delete(detachedTabId);
    });
  } else {
    if (mediaPrintTabs.has(currentTabId)) {
      mediaPrintTabs.delete(currentTabId);
      chrome.debugger.detach({ tabId: currentTabId });
    }
  }
});
