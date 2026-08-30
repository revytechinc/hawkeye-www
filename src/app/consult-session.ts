/*
 * Copyright (c) 2026, REVYTECH, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */

/** Query the operator typed. Captured 2026-08-30 on a Hawkeye jail. */
export const CONSULT_QUERY = 'ZFS root is read-only after boot';

/** Prompt line the operator typed. The binary currently prints JSON. */
export const CONSULT_PROMPT = `$ hawkeye consult '${CONSULT_QUERY}'`;

/**
 * Real consult JSON from that session. Titles and notes are as printed.
 * Do not invent ranks, extra hit fields, or an LLM rewrite.
 */
export const CONSULT_RESULT = {
  query: CONSULT_QUERY,
  tier: 1,
  hits: [
    { Title: 'List, activate, or roll back a ZFS boot environment' },
    { Title: 'Single-user versus multi-user' },
    { Title: 'Import a ZFS pool (readonly first, then unlock)' },
    { Title: 'Remount ZFS root read-write' },
    { Title: 'Remount UFS root read-write' },
    { Title: 'Bring up a NIC with ifconfig, dhclient, or service netif' },
    { Title: 'Run fsck on UFS (never on ZFS)' },
    { Title: 'Load ZFS encryption keys at the console' },
  ],
  notes: ['llm skipped: local llm model is not configured'],
} as const;

/** Terminal session: prompt, then pretty-printed JSON. */
export function formatConsultSession(): string {
  return `${CONSULT_PROMPT}\n${JSON.stringify(CONSULT_RESULT, null, 2)}`;
}

/**
 * Host commands from hawkeye-data playbook zfs-remount-rw
 * (title: Remount ZFS root read-write). Secondary “what a hit contains”
 * snippet only — not a consult transcript.
 */
export const REMOUNT_ZFS_HIT_COMMANDS = `export PATH=/rescue:/sbin:/bin:/usr/sbin:/usr/bin
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
mount -p | awk '$2=="/" {print}'`;
