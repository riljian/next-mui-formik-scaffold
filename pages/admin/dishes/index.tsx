import { Icon } from '@iconify/react'
import { Box } from '@mui/material'
import type { GetStaticProps, NextPage } from 'next'
import { ComponentProps, useEffect, useState } from 'react'
import AdminLayout from '../../../components/AdminLayout'
import DataTable from '../../../components/DataTable'
import { ADMIN_ENTRIES } from '../../../configs/admin/path'
import { getAdminPageTitle } from '../../../helpers/admin'
import Dish from '../../../models/Dish'

type DataTableProps = ComponentProps<typeof DataTable>
type State = {
  dishes: readonly Dish[]
  selectedDishes: readonly Dish[]
  order: DataTableProps['order']
  orderBy: keyof Dish | null
}

const DishActiveState = () => (
  <Box component="span" sx={{ color: (theme) => theme.palette.success.main }}>
    <Icon icon="bi:check-circle-fill" />
  </Box>
)
const DishInactiveState = () => (
  <Box component="span" sx={{ color: (theme) => theme.palette.error.main }}>
    <Icon icon="ic:baseline-disabled-by-default" />
  </Box>
)

const { title: titlePostfix } = ADMIN_ENTRIES[1]
const title = getAdminPageTitle(titlePostfix)
const columns = [
  {
    field: 'id',
    label: '編號',
    sortable: true,
  },
  {
    field: 'name',
    label: '名稱',
  },
  {
    field: 'active',
    label: '啟用狀態',
    sortable: true,
    defaultSortDirection: 'desc',
    renderer: (value: boolean) =>
      value ? <DishActiveState /> : <DishInactiveState />,
  },
] as const

const AdminDishes: NextPage = () => {
  const [{ dishes, selectedDishes, order, orderBy }, setState] =
    useState<State>(() => ({
      dishes: [],
      selectedDishes: [],
      order: 'asc',
      orderBy: 'id',
    }))

  useEffect(() => {
    Dish.loadFromListDishes().then((dishes) => {
      setState((s) => ({ ...s, dishes }))
    })
  }, [])

  return (
    <AdminLayout title={title}>
      <DataTable
        columns={columns}
        dataset={dishes}
        keyField="id"
        selectable
        selected={selectedDishes}
        onSelectedChange={(selected) =>
          setState((s) => ({ ...s, selectedDishes: selected }))
        }
        order={order}
        orderBy={orderBy}
        onOrderChange={(key, direction) =>
          setState((s) => ({
            ...s,
            order: direction,
            orderBy: key,
          }))
        }
      />
    </AdminLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    title,
  },
})

export default AdminDishes
