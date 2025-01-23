'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, ChevronDownIcon, UserIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { format, isBefore, startOfDay } from 'date-fns';
import queryString from 'query-string';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import {
  flightCabinClasses,
  flightCabinClassesValues,
  flightTypes,
  flightTypesValues,
} from '~/lib/constants';
import { cn } from '~/lib/utils';
import { validations } from '~/lib/validations';
import { Counter } from './counter';
import { useEffect } from 'react';
import { ComboboxAirports } from './combobox-airports';
import { Calendar } from '~/components/ui/calendar';
import { routes } from '~/lib/routes';
import { useRouter } from 'next/navigation';
import { FormCalendar } from '~/components/core/form-calendar';

type FormSchema = z.infer<typeof formSchema>;

const strings = {
  validations: {
    sameCities: "You can't fly to the same city",
  },
  type: {
    placeholder: 'Flight type',
    items: [
      {
        label: 'Round trip',
        value: flightTypes.roundTrip,
      },
      {
        label: 'One-way',
        value: flightTypes.oneWay,
      },
    ],
  },
  passengers: {
    adults: {
      title: 'Adults',
    },
    children: {
      title: 'Children',
      description: 'Aged 2-11',
    },
    infantsInSeat: {
      title: 'Infants',
      description: 'In seat',
    },
    infantsOnLap: {
      title: 'Infants',
      description: 'On lap',
    },
  },
  cabinClass: {
    placeholder: 'Cabin',
    items: [
      {
        label: 'Economy',
        value: flightCabinClasses.economy,
      },
      {
        label: 'Premium economy',
        value: flightCabinClasses.premiumEconomy,
      },
      {
        label: 'Business',
        value: flightCabinClasses.business,
      },
      {
        label: 'First',
        value: flightCabinClasses.first,
      },
    ],
  },
  destination: {
    label: 'Destination',
  },
  origin: {
    label: 'Origin',
  },
  date: {
    label: 'Date',
    placeholder: 'Select date',
  },
  returnDate: {
    label: 'Return date',
    placeholder: 'Select date',
  },
  search: 'Search',
};

const formSchema = z
  .object({
    type: z.enum(flightTypesValues, {
      required_error: validations.required,
      invalid_type_error: validations.required,
      message: validations.required,
    }),
    passengers: z.object({
      adults: z.number(),
      children: z.number(),
      infantsInSeat: z.number(),
      infantsOnLap: z.number(),
    }),
    cabinClass: z.enum(flightCabinClassesValues, {
      required_error: validations.required,
      invalid_type_error: validations.required,
      message: validations.required,
    }),
    origin: z
      .object({
        label: z.string(),
        skyId: z.string(),
        entityId: z.string(),
      })
      .refine(
        (values) => values.entityId.length > 0 && values.skyId.length > 0,
        validations.required
      ),
    destination: z
      .object({
        label: z.string(),
        skyId: z.string(),
        entityId: z.string(),
      })
      .refine(
        (values) => values.entityId.length > 0 && values.skyId.length > 0,
        validations.required
      ),
    date: z.date({
      invalid_type_error: validations.required,
      required_error: validations.required,
      message: validations.required,
    }),
    returnDate: z
      .date({
        invalid_type_error: validations.required,
        required_error: validations.required,
        message: validations.required,
      })
      .optional(),
  })
  .superRefine((val, ctx) => {
    if (val.destination.entityId === val.origin.entityId)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: strings.validations.sameCities,
        path: ['destination'],
      });

    if (val.type === flightTypes.roundTrip && !val.returnDate)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: validations.required,
        path: ['returnDate'],
      });
  });

type Props = {
  className?: string;
};

export const FormSearchFlights = ({ className }: Props) => {
  const router = useRouter();

  const form = useForm<FormSchema>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'round-trip',
      passengers: {
        adults: 1,
        children: 0,
        infantsInSeat: 0,
        infantsOnLap: 0,
      },
      cabinClass: 'economy',
      destination: {
        label: '',
        entityId: '',
        skyId: '',
      },
      origin: {
        label: '',
        entityId: '',
        skyId: '',
      },
    },
  });
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = form;

  const passengers = watch('passengers');
  const goingDate = watch('date');
  const returnDate = watch('returnDate');
  const type = watch('type');

  useEffect(() => {
    if (!returnDate || isBefore(goingDate, returnDate)) return;

    setValue('returnDate', undefined);
  }, [returnDate, goingDate]);

  useEffect(() => {
    if (passengers.adults >= passengers.infantsOnLap) return;

    setValue('passengers.infantsOnLap', passengers.adults);
  }, [passengers.adults, passengers.infantsOnLap]);

  const onSubmit = (values: FormSchema) => {
    const url = queryString.stringifyUrl({
      url: routes.search,
      query: {
        originSkyId: values.origin.skyId,
        destinationSkyId: values.destination.skyId,
        originEntityId: values.origin.entityId,
        destinationEntityId: values.destination.entityId,
        date: format(values.date!, 'yyyy-MM-dd'),
        ...(values.returnDate && {
          returnDate: format(values.returnDate, 'yyyy-MM-dd'),
        }),
        cabinClass: values.cabinClass,
        adults: values.passengers.adults,
        childrens: values.passengers.children,
        infants: values.passengers.infantsInSeat,
      },
    });

    router.push(url);
  };

  return (
    <Form {...form}>
      <form
        className={cn('p-6 shadow bg-white rounded-md', className)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex gap-3 flex-wrap">
          <FormField
            name="type"
            control={control}
            render={({ field }) => (
              <FormItem className="space-y-0 w-28">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-0 hover:bg-slate-50">
                      <SelectValue placeholder={strings.type.placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {strings.type.items.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="passengers"
            control={control}
            render={({ field: passengersField }) => (
              <FormItem className="space-y-0">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="gap-x-2 border-0 hover:bg-slate-50"
                    >
                      <UserIcon />
                      {Object.values(passengersField.value).reduce(
                        (prev, curr) => prev + curr,
                        0
                      )}
                      <ChevronDownIcon className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 space-y-5" align="start">
                    <FormField
                      name="passengers.adults"
                      control={control}
                      render={({ field }) => (
                        <FormItem className="space-y-0">
                          <FormControl>
                            <Counter
                              title={strings.passengers.adults.title}
                              min={1}
                              value={field.value}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="passengers.children"
                      control={control}
                      render={({ field }) => (
                        <FormItem className="space-y-0">
                          <FormControl>
                            <Counter
                              title={strings.passengers.children.title}
                              description={
                                strings.passengers.children.description
                              }
                              min={0}
                              value={field.value}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="passengers.infantsInSeat"
                      control={control}
                      render={({ field }) => (
                        <FormItem className="space-y-0">
                          <FormControl>
                            <Counter
                              title={strings.passengers.infantsInSeat.title}
                              description={
                                strings.passengers.infantsInSeat.description
                              }
                              min={0}
                              value={field.value}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="passengers.infantsOnLap"
                      control={control}
                      render={({ field }) => (
                        <FormItem className="space-y-0">
                          <FormControl>
                            <Counter
                              title={strings.passengers.infantsOnLap.title}
                              description={
                                strings.passengers.infantsOnLap.description
                              }
                              min={0}
                              max={passengersField.value.adults}
                              value={field.value}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            name="cabinClass"
            control={control}
            render={({ field }) => (
              <FormItem className="space-y-0 w-40">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-0 hover:bg-slate-50">
                      <SelectValue
                        placeholder={strings.cabinClass.placeholder}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {strings.cabinClass.items.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="pt-6 grid sm:grid-cols-2 gap-y-6 md:grid-cols-4 gap-x-4">
          <FormField
            name="origin"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block">{strings.origin.label}</FormLabel>
                <FormControl>
                  <ComboboxAirports
                    className="w-full"
                    formValue={field.value.label}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="destination"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block">
                  {strings.destination.label}
                </FormLabel>
                <FormControl>
                  <ComboboxAirports
                    className="w-full"
                    formValue={field.value.label}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="date"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block">{strings.date.label}</FormLabel>
                <FormCalendar
                  value={field.value}
                  placeholder={strings.date.placeholder}
                  onChange={field.onChange}
                  handleDisabled={(date) => date < startOfDay(new Date())}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {type === flightTypes.roundTrip && (
            <FormField
              name="returnDate"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block">
                    {strings.returnDate.label}
                  </FormLabel>
                  <FormCalendar
                    value={field.value}
                    placeholder={strings.returnDate.placeholder}
                    onChange={field.onChange}
                    handleDisabled={(date) => date < goingDate}
                    disabled={!goingDate}
                    defaultMonth={goingDate}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="flex justify-end pt-10">
          <Button type="submit" isLoading={isSubmitting}>
            {strings.search}
          </Button>
        </div>
      </form>
    </Form>
  );
};
