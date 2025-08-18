import { Badge } from '~/components/badge'
import { Button } from '~/components/button'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '~/components/dialog'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '~/components/dropdown'
import { Heading } from '~/components/heading'
import { EllipsisHorizontalIcon } from '~/components/icons/ellipsis-horizontal-icon'
import { PenIcon } from '~/components/icons/pen-icon'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/table'
import type { Microgrid } from '~/types/microgrids'
import { formatApiDate } from '~/utils/format-date'
import { useState } from 'react'
import { EditSupplierApplication } from './edit-supplier-application'

export function DashboardMicrogridSubmissionsPanel({ microgrids }: { microgrids: Microgrid[] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="p-6">
      <div className="flex items-end justify-between gap-4">
        <Heading> Microgrid Submissions ({1})</Heading>
        <Button className="-my-0.5">Add new</Button>
      </div>

      <Table striped className="mt-8">
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Location</TableHeader>
            <TableHeader>Submitted</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader className="relative w-0">
              <span className="sr-only">Quick edit</span>
            </TableHeader>
            <TableHeader className="relative w-0">
              <span className="sr-only">Actions</span>
            </TableHeader>
          </TableRow>
        </TableHead>

        <TableBody>
          {microgrids.map((microgrid) => (
            <TableRow key={microgrid.id} href={`${microgrid.microgridName.toLowerCase().split(' ').join('-')}`}>
              <TableCell>
                <div className="font-medium">{microgrid.microgridName}</div>
                <div className="text-zinc-500">{microgrid.category}</div>
              </TableCell>

              <TableCell>{microgrid.type}</TableCell>

              <TableCell>
                <div>{`${microgrid.lga}, ${microgrid.state}`}</div>
                <div className="text-zinc-500">{microgrid.geopoliticalZone}</div>
              </TableCell>

              <TableCell className="text-zinc-500">{formatApiDate(microgrid.createdAt || '')}</TableCell>

              <TableCell>{<Badge color="lime">pending</Badge>}</TableCell>

              <TableCell>
                <div className="-mx-3 -my-1.5 sm:-mx-2.5">
                  <Button type="button" variant="plain" aria-label="Quick edit" onClick={() => setIsOpen(true)}>
                    <PenIcon className="size-4" />
                  </Button>
                  <Dialog open={isOpen} onClose={setIsOpen} size="3xl">
                    <DialogTitle>Edit Microgrid Submission</DialogTitle>
                    <DialogDescription>The follow users have access to your account.</DialogDescription>

                    <DialogBody>
                      <EditSupplierApplication />
                    </DialogBody>

                    <DialogActions>
                      <Button onClick={() => setIsOpen(false)}>Close</Button>
                    </DialogActions>
                    {/* <DialogActions>
                      <Button onClick={() => setIsOpen(false)}>
                        Save changes
                      </Button>
                    </DialogActions> */}
                  </Dialog>
                </div>
              </TableCell>

              <TableCell>
                <div className="-mx-3 -my-1.5 sm:-mx-2.5">
                  <Dropdown>
                    <DropdownButton variant="plain" aria-label="More options">
                      <EllipsisHorizontalIcon className="size-4" />
                    </DropdownButton>
                    <DropdownMenu anchor="bottom end">
                      <DropdownItem>Approve</DropdownItem>
                      <DropdownItem>Reject</DropdownItem>
                      <DropdownItem>Delete</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
