import {
  getAreasByState,
  getGeopoliticalZoneByState,
  getLgaByState,
  nigerianStates,
} from '@/assets/nigeriaGeospatialData'
import { Combobox, ComboboxLabel, ComboboxOption } from '@/components/combobox'
import { ErrorMessage, Field, FieldGroup, Fieldset, Label, Legend } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Listbox, ListboxLabel, ListboxOption } from '@/components/listbox'
import { Text } from '@/components/text'
import type { Microgrid, MicrogridValidationErrors } from '@/types/microgrids'
import { useState } from 'react'

export function LocationDetailsFormSection({
  errors,
  formValues,
  onChange,
}: {
  errors: MicrogridValidationErrors | null
  formValues: Omit<Microgrid, 'status' | 'slug'>
  onChange: <T extends keyof Microgrid>(name: T, value: Microgrid[T]) => void
}) {
  const [state, setState] = useState('')

  const positionError = errors?.validation?.position
  const latError =
    positionError?.length === 2
      ? positionError.at(0)
      : positionError?.at(0)?.toLowerCase().includes('lat')
        ? positionError.at(0)
        : ''
  const lngError =
    positionError?.length === 2
      ? positionError.at(1)
      : positionError?.at(0)?.toLowerCase().includes('lng')
        ? positionError.at(0)
        : ''

  return (
    <div>
      <Fieldset aria-label="Location details">
        <FieldGroup>
          <Field>
            <Label>Address</Label>
            <Input
              type="text"
              name="address"
              placeholder="No 01, street name, ..."
              invalid={!!errors?.validation?.address}
              onChange={(event) => onChange('address', event.target.value)}
            />
            {errors?.validation?.address && <ErrorMessage>{errors.validation.address}</ErrorMessage>}
          </Field>

          <Field>
            <Label>State</Label>
            <Listbox
              name="state"
              placeholder="Select state&hellip;"
              onChange={(value) => {
                setState(value as string)
                onChange('state', value as string)
              }}
              invalid={!!errors?.validation?.state}
            >
              {nigerianStates.map((state) => (
                <ListboxOption key={state} value={state}>
                  <ListboxLabel>{state}</ListboxLabel>
                </ListboxOption>
              ))}
            </Listbox>
            {errors?.validation?.state && <ErrorMessage>{errors.validation.state}</ErrorMessage>}
          </Field>

          <Field>
            <Label>Area (Town/Village/Ward)</Label>
            <Combobox
              name="area"
              options={getAreasByState(state)}
              displayValue={(area) => area || ''}
              placeholder="Select Area&hellip;"
              invalid={!!errors?.validation?.area}
              onChange={(value) => onChange('area', value as string)}
            >
              {(area) => (
                <ComboboxOption value={area}>
                  <ComboboxLabel>{area}</ComboboxLabel>
                </ComboboxOption>
              )}
            </Combobox>
            {errors?.validation?.area && <ErrorMessage>{errors.validation.area}</ErrorMessage>}
          </Field>

          <Field>
            <Label>LGA (Local Government Area)</Label>
            <Listbox
              name="lga"
              placeholder="Select LGA&hellip;"
              disabled={!state}
              invalid={!!errors?.validation?.lga}
              onChange={(value) => onChange('lga', value as string)}
            >
              {getLgaByState(state).map((lga) => (
                <ListboxOption key={lga} value={lga}>
                  <ListboxLabel>{lga}</ListboxLabel>
                </ListboxOption>
              ))}
            </Listbox>
            {errors?.validation?.lga && <ErrorMessage>{errors.validation.lga}</ErrorMessage>}
          </Field>

          <Field>
            <Label>Geopolitical Zone</Label>
            <Input
              type="text"
              name="geopoliticalZone"
              value={getGeopoliticalZoneByState(state)}
              readOnly
              className="pointer-events-none opacity-50 before:bg-zinc-950/5 before:shadow-none"
            />
          </Field>
        </FieldGroup>
      </Fieldset>

      <Fieldset className="mt-8">
        <Legend>Coordinates</Legend>
        <Text>Example: 5.1811, 7.7142 for Ikot Ekpene</Text>
        <FieldGroup>
          <div className="grid grid-cols-2 gap-6">
            <Field>
              <Input
                aria-label="Latitude"
                type="text"
                name="lat"
                placeholder="Latitude"
                invalid={!!latError}
                onChange={(event) =>
                  onChange('position', {
                    ...formValues.position,
                    lat: event.target.value,
                  })
                }
              />
              {latError && <ErrorMessage>{latError}</ErrorMessage>}
            </Field>

            <Field>
              <Input
                aria-label="Longitude"
                type="text"
                name="lng"
                placeholder="Longitude"
                invalid={!!lngError}
                onChange={(event) =>
                  onChange('position', {
                    ...formValues.position,
                    lng: event.target.value,
                  })
                }
              />
              {lngError && <ErrorMessage>{lngError}</ErrorMessage>}
            </Field>
          </div>
        </FieldGroup>
      </Fieldset>
    </div>
  )
}
