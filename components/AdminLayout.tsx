import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { ADMIN_ENTRIES } from '../configs/admin/path'
import { DRAWER_WIDTH } from '../configs/theme'
import Link from './Link'

interface Props {
  title: string
}

const AdminLayout: FC<Props> = ({ children, title }) => {
  const { pathname: currentPathname } = useRouter()
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box component="nav" sx={{ overflow: 'auto' }}>
          <List>
            {ADMIN_ENTRIES.map(({ pathname, title }) => (
              <ListItem disablePadding key={title}>
                <ListItemButton
                  component={Link}
                  href={pathname}
                  selected={currentPathname === pathname}
                >
                  <ListItemText primary={title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default AdminLayout
