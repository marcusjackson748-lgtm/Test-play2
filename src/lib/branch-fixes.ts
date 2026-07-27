/**
 * Branch Fixes Service
 * Manages and provides access to branch fix patches from the branch-fixes folder
 */

export type BranchFix = {
  id: string;
  branch: string;
  patchFile: string;
  title: string;
  description: string;
  packages: string[];
  status: 'available' | 'applied' | 'pending';
  createdAt: string;
};

export const BRANCH_FIXES: BranchFix[] = [
  {
    id: 'terminal-xterm',
    branch: 'Terminal-/-Feature',
    patchFile: '0001-fix-add-xterm-packages-canvas-confetti-exclude-compo.patch',
    title: 'Terminal Feature - XTerm Packages',
    description: 'Adds @xterm/xterm, @xterm/addon-fit, @xterm/addon-web-links, and canvas-confetti. Updates tsconfig.json to exclude components-2 from type checking.',
    packages: [
      '@xterm/xterm@^6.0.0',
      '@xterm/addon-fit@^0.11.0',
      '@xterm/addon-web-links@^0.12.0',
      'canvas-confetti@^1.9.4'
    ],
    status: 'available',
    createdAt: '2026-07-20T14:33:21Z'
  },
  {
    id: 'workbench-packages',
    branch: 'Cmpnt-/-WorkBench',
    patchFile: '0001-fix-Cmpnt-WorkBench-add-missing-packages-canvas-conf.patch',
    title: 'WorkBench Component - Missing Packages',
    description: 'Adds framer-motion, nanostores, @nanostores/react, react-toastify, react-resizable-panels, @radix-ui/react-dropdown-menu, and canvas-confetti.',
    packages: [
      'framer-motion@^12.42.2',
      'nanostores@^1.4.0',
      '@nanostores/react@^1.1.0',
      'react-toastify@^11.1.0',
      'react-resizable-panels@^4.12.2',
      '@radix-ui/react-dropdown-menu@^2.1.21',
      'canvas-confetti@^1.9.4'
    ],
    status: 'available',
    createdAt: '2026-07-20T14:45:22Z'
  },
  {
    id: 'sidebar-radix',
    branch: 'Cmpnt/-Sidebar',
    patchFile: '0001-fix-Cmpnt-Sidebar-add-framer-motion-react-toastify-r.patch',
    title: 'Sidebar Component - UI & Animation Packages',
    description: 'Adds framer-motion, react-toastify, @radix-ui/react-dialog, and canvas-confetti for enhanced sidebar interactions.',
    packages: [
      '@radix-ui/react-dialog@^1.1.20',
      'framer-motion@^12.42.2',
      'react-toastify@^11.1.0',
      'canvas-confetti@^1.9.4'
    ],
    status: 'available',
    createdAt: '2026-07-20T14:45:56Z'
  },
  {
    id: 'ui-dialog',
    branch: 'Cmpnt/-UI',
    patchFile: '0001-fix-Cmpnt-UI-add-radix-ui-react-dialog-framer-motion.patch',
    title: 'UI Component - Dialog & Animation',
    description: 'Adds @radix-ui/react-dialog, framer-motion, @nanostores/react, and canvas-confetti for UI enhancements.',
    packages: [
      '@radix-ui/react-dialog@^1.1.20',
      'framer-motion@^12.42.2',
      '@nanostores/react@^1.1.0',
      'canvas-confetti@^1.9.4'
    ],
    status: 'available',
    createdAt: '2026-07-20T14:46:30Z'
  },
  {
    id: 'chat-ai',
    branch: 'Compnt-/-Chat',
    patchFile: '0001-fix-Compnt-Chat-add-ai-shiki-react-markdown-framer-m.patch',
    title: 'Chat Component - AI & Markdown Support',
    description: 'Adds ai, shiki, react-markdown, framer-motion, react-toastify, nanostores, @nanostores/react, remix-utils, and canvas-confetti for rich chat functionality.',
    packages: [
      'ai@^3.4.0',
      'shiki@^1.29.2',
      'react-markdown@^10.1.0',
      'framer-motion@^12.42.2',
      'react-toastify@^11.1.0',
      'nanostores@^1.4.0',
      '@nanostores/react@^1.1.0',
      'remix-utils@^7.7.0',
      'canvas-confetti@^1.9.4'
    ],
    status: 'available',
    createdAt: '2026-07-20T14:47:14Z'
  },
  {
    id: 'header-codemirror',
    branch: 'Compnt-/-Header',
    patchFile: '0001-fix-Compnt-Header-add-codemirror-packages-uiw-codemi.patch',
    title: 'Header Component - CodeMirror Editor',
    description: 'Adds @codemirror packages for code editing capabilities, @uiw/codemirror-theme-vscode theme, and canvas-confetti.',
    packages: [
      '@codemirror/autocomplete@^6.20.3',
      '@codemirror/commands@^6.10.4',
      '@codemirror/lang-javascript@^6.2.5',
      '@codemirror/language@^6.12.4',
      '@codemirror/search@^6.7.1',
      '@codemirror/state@^6.7.1',
      '@codemirror/view@^6.43.6',
      '@uiw/codemirror-theme-vscode@^4.25.11',
      'canvas-confetti@^1.9.4'
    ],
    status: 'available',
    createdAt: '2026-07-20T14:47:49Z'
  }
];

/**
 * Get all available branch fixes
 */
export function getAllBranchFixes(): BranchFix[] {
  return BRANCH_FIXES;
}

/**
 * Get a specific branch fix by ID
 */
export function getBranchFixById(id: string): BranchFix | undefined {
  return BRANCH_FIXES.find(fix => fix.id === id);
}

/**
 * Get fixes by branch name
 */
export function getFixesByBranch(branch: string): BranchFix[] {
  return BRANCH_FIXES.filter(fix => fix.branch === branch);
}

/**
 * Get all unique branches with fixes
 */
export function getAllBranches(): string[] {
  return Array.from(new Set(BRANCH_FIXES.map(fix => fix.branch)));
}
