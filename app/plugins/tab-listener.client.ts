let channel: BroadcastChannel | null = null;

function handleTabMessage(e: MessageEvent) {
  if (e.data === "jobnova_logout") {
    // Navigate other tabs to home, clearing history stack
    window.history.pushState(null, "", "/");
    window.location.replace("/");
  }
}

export default defineNuxtPlugin({
  name: "tab-listener-plugin",
  enforce: "post",
  hooks: {
    "app:created": () => {
      channel = new BroadcastChannel("jobnova_tab_sync");
      channel.addEventListener("message", handleTabMessage);
    },
    "app:beforeMount": () => {
      channel?.removeEventListener("message", handleTabMessage);
      channel?.close();
      channel = null;
    },
  },
});
