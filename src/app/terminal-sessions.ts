/*
 * Copyright (c) 2026, REVYTECH, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

/** Query the operator typed at the hawkeye prompt. */
export const HAWKEYE_QUERY = 'ZFS root is read-only after boot';

/**
 * Product interface: bare `hawkeye` (no subcommand), like `ollama run`.
 * python pty on pkg hawkeye-0.1.0_11 + hawkeye-data-0.1.0_4, healthy jail.
 * Query as typed, default N, nothing applied. First-look is silent, then
 * the prompt. Do not invent first-look findings. [y/N/e] stays in the tty.
 * The unlabeled paragraph after also: is as captured. Do not put JSON
 * here. Doctor is not this demo.
 */
export const HAWKEYE_SESSION = `$ hawkeye
hawkeye
> ${HAWKEYE_QUERY}
Remount ZFS root read-write
  Root is a ZFS dataset and is mounted read-only (single-user, panic
  remount, zfs readonly=on, or a readonly pool import). You need to edit
  files, write logs, or run tools that create files.

  export PATH=/rescue:/sbin:/bin:/usr/sbin:/usr/bin
  mount -p
  df -T /
  zfs list -o name,mounted,mountpoint,readonly,canmount
  ROOTDS=$(mount -p | awk '$2=="/" {print $1}')
  echo "root dataset: $ROOTDS"
  zfs get -o property,value name,readonly,mounted,encryption,keystatus "$ROOTDS"
  zpool get readonly "$(echo "$ROOTDS" | awk -F/ '{print $1}')"
  zfs set readonly=off "$ROOTDS"
  zfs mount -u "$ROOTDS"
  mount -u -o rw /
  mount -p | awk '$2=="/" {print}'

also:
  Remount UFS root read-write
  Run fsck on UFS (never on ZFS)
  Import a ZFS pool (readonly first, then unlock)
  Load ZFS encryption keys at the console
  Root filesystem full or inodes exhausted
  List, activate, or roll back a ZFS boot environment
  Compare fstab to mounted filesystems

  You're experiencing a common issue with the ZFS filesystem during the boot process. Here are some steps to help you troubleshoot and resolve this problem:

  1. **Verify Boot Process:**
     - Ensure you are booting with the ZFS boot flag (ZFS_ROOT). This can be set by entering \`boot flag\` (ZFS_ROOT) at boot time.
     - If you are using a boot loader, ensure it is set to boot with ZFS_ROOT (ZFS_ROOT).

  2. **Check Boot Configuration:**
     - Review your boot configuration file (e.g., \`boot.cfg\`) to ensure it is correctly set to boot with ZFS_ROOT.
     - Make sure the boot loader is configured to boot with ZFS_ROOT.

  3. **Check ZFS Configuration:**
     - Ensure ZFS configuration is correct and that the \`root\` option is properly set.
     - Verify that the \`root\` option is not causing any issues.

  4. **Check ZFS Root Options:**
     - Confirm that the ZFS root option is correctly set:
       \`\`\`zfsctl
       root on
       \`\`\`

  5. **Check Boot Loader Configuration:**
     - Ensure your boot loader is correctly configured to boot with ZFS_ROOT.

Apply these steps? [y/N/e]
nothing applied
>`;

/** Root types one package. hawkeye-data is a RUN_DEPENDS. */
export const PKG_INSTALL_SESSION = `# pkg install hawkeye`;
