/*
 * Copyright (c) 2026, REVYTECH, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

/** Query the operator typed at the hawkeye prompt. */
export const HAWKEYE_QUERY = 'ZFS root is read-only after boot';

/**
 * Product interface: bare `hawkeye` (no subcommand), like `ollama run`.
 * script(1) on pkg hawkeye-0.1.0_4 (SHA eaf77537), healthy jail.
 * First-look is silent, then the prompt. Do not invent first-look
 * findings. [y/N/e] stays in the tty.
 * Do not put JSON here. Doctor is not this demo.
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
  List, activate, or roll back a ZFS boot environment
  Single-user versus multi-user
  Compare fstab to mounted filesystems
  Import a ZFS pool (readonly first, then unlock)
  Remount UFS root read-write
  rc.conf enable=YES but script or binary missing
  Bring up a NIC with ifconfig, dhclient, or service netif

Apply these steps? [y/N/e]`;

/** Root types one package. hawkeye-data is a RUN_DEPENDS. */
export const PKG_INSTALL_SESSION = `# pkg install hawkeye`;
