const mediaPrintTabs = new Set();

chrome.debugger.onDetach.addListener((source, reason) => {
  mediaPrintTabs.delete(source.tabId);
});

chrome.action.onClicked.addListener((currentTab) => {
  const tab = currentTab.id;
  if (!mediaPrintTabs.has(tab)) {
    mediaPrintTabs.add(tab);
    chrome.debugger.attach({ tabId: tab }, '1.2').then(
      chrome.debugger.sendCommand({ tabId: tab }, 'Emulation.setEmulatedMedia', { media: "print" })
    );
  } else {
    mediaPrintTabs.delete(tab);
    chrome.debugger.detach({ tabId: tab });
  }
});
