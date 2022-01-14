import { Typography } from '@mui/material'
import type { GetStaticProps, NextPage } from 'next'
import AdminLayout from '../../components/AdminLayout'
import { getAdminPageTitle } from '../../helpers/admin'

const title = getAdminPageTitle()

const AdminHome: NextPage = () => (
  <AdminLayout title={title}>
    <Typography>首頁</Typography>
  </AdminLayout>
)

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    title,
  },
})

export default AdminHome
