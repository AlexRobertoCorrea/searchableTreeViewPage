import React from 'react'

import { PropsTreeView } from './types'

import styles from './TreeView.module.scss'

const TreeView: React.FC<PropsTreeView> = ({ treeViewData }) => {
  return (
    <ul className={styles['tree-view']}>
      {(treeViewData || []).map((leaf) =>
        leaf.name ? (
          <li className={styles['tree-view__container']} key={leaf.id}>
            <span data-id={leaf.id}>{leaf.name}</span>
            {leaf.children && (
              <TreeView key={leaf.id} treeViewData={leaf.children} />
            )}
          </li>
        ) : null
      )}
    </ul>
  )
}

export default TreeView
