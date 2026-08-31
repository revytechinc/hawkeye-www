/*
 * Copyright (c) 2026, REVYTECH, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

/** Query the operator typed at the hawkeye prompt. */
export const HAWKEYE_QUERY = 'ZFS root is read-only after boot';

/**
 * Product interface: bare `hawkeye` (no subcommand), like `ollama run`.
 * Panic path — operators should not have to type a quoted consult line.
 * Remount playbook body is the jail capture. [y/N/e] stays in the tty.
 * Do not put JSON here.
 */
export const HAWKEYE_SESSION = `$ hawkeye
hawkeye
> ${HAWKEYE_QUERY}

Remount ZFS root read-write
  Root is a ZFS dataset and is mounted read-only (single-user, panic remount,
  zfs readonly=on, or a readonly pool import).

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

  If the pool was imported readonly=on, dataset readonly=off is not enough;
  export and re-import without readonly.

also:
  List, activate, or roll back a ZFS boot environment
  Single-user versus multi-user
  Import a ZFS pool (readonly first, then unlock)

Apply these steps? [y/N/e]`;

/**
 * Real doctor preamble only. No JSON, no pid number, no file:/// sqlite URL.
 */
export const DOCTOR_SESSION = `$ hawkeye doctor
hawkeye doctor: healthy
tier: 1
  config         ok  configuration is valid
  permissions    ok  config mode 0644
  pidfile        ok  pid …
  dependencies   ok  knowledge kit open
  headroom       ok  resource snapshot recorded`;

/** Root types one package. hawkeye-data is a RUN_DEPENDS. */
export const PKG_INSTALL_SESSION = `# pkg install hawkeye`;
