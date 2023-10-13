import HostViewPage from '@/routes/storage/host/view'
import VulnAddPage from '@/routes/storage/vuln/add'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import httpClient from '@/lib/httpClient'

import { errorResponse } from '@/tests/utils/errorResponse'
import { renderWithProviders } from '@/tests/utils/renderWithProviders'

const hostLoader = () =>
  Promise.resolve({
    address: '127.4.4.4',
    comment: '',
    created: 'Mon, 17 Jul 2023 20:01:09 GMT',
    hostname: 'testhost.testdomain.test<script>alert(1);</script>',
    id: 1,
    modified: 'Wed, 27 Sep 2023 18:23:19 GMT',
    notesCount: 3,
    os: 'Test Linux 1',
    rescan_time: 'Mon, 17 Jul 2023 20:01:09 GMT',
    servicesCount: 4,
    tags: ['reviewed'],
    vulnsCount: 12,
  })

const serviceLoader = () =>
  Promise.resolve({
    address: '127.128.129.130',
    comment: null,
    host_id: 37,
    hostname: 'serverz.localhost',
    id: 52,
    info: null,
    name: null,
    port: 443,
    proto: 'tcp',
    state: 'open:nessus',
    tags: [],
  })

describe('Vuln add page', () => {
  it('shows form (host)', async () => {
    renderWithProviders({
      element: <VulnAddPage type="host" />,
      path: '/storage/vuln/add/host/1',
      loader: hostLoader,
    })

    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem').map((item) => item.textContent)
      expect(listItems.includes('Vulns')).toBeTruthy()
      expect(listItems.includes('Add')).toBeTruthy()
      expect(screen.getByLabelText('Host ID')).toHaveValue(1)
      expect(screen.getByLabelText('Service ID')).toHaveValue(0)
      expect(screen.getByLabelText('Via target')).toHaveValue('')
      expect(screen.getByLabelText('Name')).toHaveValue('')
      expect(screen.getByLabelText('xType')).toHaveValue('')
      expect(screen.getByLabelText('Descr')).toHaveValue('')
      expect(screen.getByLabelText('Data')).toHaveValue('')
      expect(screen.getByLabelText('Refs')).toHaveValue('')
      expect(screen.getByLabelText('Comment')).toHaveValue('')
    })
  })

  it('shows form (service)', async () => {
    renderWithProviders({
      element: <VulnAddPage type="service" />,
      path: '/storage/vuln/add/service/52',
      loader: serviceLoader,
    })

    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem').map((item) => item.textContent)
      expect(listItems.includes('Vulns')).toBeTruthy()
      expect(listItems.includes('Add')).toBeTruthy()
      expect(screen.getByLabelText('Host ID')).toHaveValue(37)
      expect(screen.getByLabelText('Service ID')).toHaveValue(52)
      expect(screen.getByLabelText('Via target')).toHaveValue('')
      expect(screen.getByLabelText('Name')).toHaveValue('')
      expect(screen.getByLabelText('xType')).toHaveValue('')
      expect(screen.getByLabelText('Descr')).toHaveValue('')
      expect(screen.getByLabelText('Data')).toHaveValue('')
      expect(screen.getByLabelText('Refs')).toHaveValue('')
      expect(screen.getByLabelText('Comment')).toHaveValue('')
    })
  })

  it('adds new vuln (host)', async () => {
    renderWithProviders({
      element: <VulnAddPage type="host" />,
      path: '/storage/vuln/add/host/1',
      loader: hostLoader,
      routes: [{ element: <HostViewPage />, path: '/storage/host/view/1', loader: hostLoader }],
    })

    vi.spyOn(httpClient, 'post').mockResolvedValueOnce({
      data: {
        host_id: 1,
      },
    })

    await waitFor(() => {
      const nameInput = screen.getByLabelText('Name')
      const addButton = screen.getByRole('button', { name: 'Add' })

      fireEvent.change(nameInput, { target: { value: 'new_vuln_name' } })
      fireEvent.click(screen.getByLabelText('high'))
      fireEvent.click(addButton)
    })

    await waitFor(() => {
      expect(screen.getByText('Vuln has been successfully added.')).toBeInTheDocument()
    })
  })

  it('adds new vuln (service)', async () => {
    renderWithProviders({
      element: <VulnAddPage type="service" />,
      path: '/storage/vuln/add/service/52',
      loader: serviceLoader,
      routes: [{ element: <HostViewPage />, path: '/storage/host/view/37', loader: hostLoader }],
    })

    vi.spyOn(httpClient, 'post').mockResolvedValueOnce({
      data: {
        host_id: 37,
      },
    })

    await waitFor(() => {
      const nameInput = screen.getByLabelText('Name')
      const addButton = screen.getByRole('button', { name: 'Add' })

      fireEvent.change(nameInput, { target: { value: 'new_vuln_name' } })
      fireEvent.click(screen.getByLabelText('high'))
      fireEvent.click(addButton)
    })

    await waitFor(() => {
      expect(screen.getByText('Vuln has been successfully added.')).toBeInTheDocument()
    })
  })

  it('adds new vuln (error)', async () => {
    renderWithProviders({
      element: <VulnAddPage type="host" />,
      path: '/storage/vuln/add/host/1',
      loader: hostLoader,
    })

    vi.spyOn(httpClient, 'post').mockRejectedValueOnce(errorResponse({ code: 500, message: 'Internal server error' }))

    await waitFor(() => {
      const nameInput = screen.getByLabelText('Name')
      const addButton = screen.getByRole('button', { name: 'Add' })

      fireEvent.change(nameInput, { target: { value: 'new_vuln_name' } })
      fireEvent.click(screen.getByLabelText('high'))
      fireEvent.click(addButton)
    })
  })
})
