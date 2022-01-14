import { Typography } from '@mui/material'
import type { GetStaticProps, NextPage } from 'next'
import AdminLayout from '../../../components/AdminLayout'
import { ADMIN_ENTRIES } from '../../../configs/admin/path'
import { getAdminPageTitle } from '../../../helpers/admin'

const { title: titlePostfix } = ADMIN_ENTRIES[0]
const title = getAdminPageTitle(titlePostfix)

const AdminSellingCombinations: NextPage = () => (
  <AdminLayout title={title}>
    <Typography>{title}</Typography>
  </AdminLayout>
)

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    title,
  },
})

export default AdminSellingCombinations
