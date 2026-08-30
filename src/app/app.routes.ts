/*
 * Copyright (c) 2026, REVYTECH, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './pages/home.component';
import { InstallComponent } from './pages/install.component';
import { RescueComponent } from './pages/rescue.component';
import { McpComponent } from './pages/mcp.component';
import { SecurityComponent } from './pages/security.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', component: HomeComponent },
      { path: 'install', component: InstallComponent },
      { path: 'rescue', component: RescueComponent },
      { path: 'mcp', component: McpComponent },
      { path: 'security', component: SecurityComponent },
      { path: '**', redirectTo: '' },
    ],
  },
];
