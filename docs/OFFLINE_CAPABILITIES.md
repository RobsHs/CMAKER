# Offline Operation & Local Storage Architecture

CMAKER is fully functional without continuous internet connectivity:

- **Local Persistence**: User projects, custom signatures, and generated certificates are saved in `localStorage` and `IndexedDB`.
- **Zero Cloud Leakage**: Exporting large batches never uploads recipient information to remote servers.
- **Instant Reload**: Workspace state survives browser tab reloads and system restarts.
