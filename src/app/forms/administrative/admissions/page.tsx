"use client"

import { db } from "~/server/db"
import Link from "next/link";
export const dynamic = "force-dynamic";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { toast } from "~/components/ui/use-toast"
import * as React from "react"
import { CaretSortIcon, CheckIcon, CalendarIcon } from "@radix-ui/react-icons"
import { cn } from "~/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { Calendar } from "~/components/ui/calendar"
import { format } from "date-fns"
import { useEffect } from "react";

const FormSchema = z.object({
  first_name: z.string().min(2).max(255),
  last_name: z.string().min(2).max(255),
  email: z.string().email(),
  phone_number: z.string().min(10).max(12),
  address_1: z.string().min(6).max(255),
  address_2: z.string().min(1).max(255).optional(),
  city: z.string().min(2).max(255),
  state: z.enum(["AL", "AK", "AZ", "AR", "CA", "CO",
                 "CT", "DE", "FL", "GA", "HI", "ID",
                 "IL", "IN", "IA", "KS", "KY", "LA",
                 "ME", "MD", "MA", "MI", "MN", "MS",
                 "MO", "MT", "NE", "NV", "NH", "NJ",
                 "NM", "NY", "NC", "ND", "OH", "OK",
                 "OR", "PA", "RI", "SC", "SD", "TN",
                 "TX", "UT", "VT", "VA", "WA", "WV",
                 "WI", "WY"]),
  zip_code: z.string().min(5).max(10),
  sex: z.enum(["Male", "Female", "Other", "Prefer not to say"]),
  race: z.enum(["White", "Black", "Hispanic",
                "Asian", "Pacific Islander", "Other", "Prefer not to say"]),
  ethnicity: z.enum(["Hispanic", "Non-Hispanic", "Prefer not to say"]),
  date_of_birth: z.date(),
  date_of_birth_month: z.number().min(1).max(12),
  date_of_birth_day: z.number().min(1).max(31),
  date_of_birth_year: z.number().min(1900).max(new Date().getFullYear() - 21),
  SSN: z.string().min(9).max(11),
  prior_education: z.enum(["None", "High School", "GED", "Some College",
                           "Associates", "Bachelors",
                           "Masters", "Doctorate"]),
  us_citizen: z.boolean(),
  WIN: z.boolean(),
  MTA: z.boolean(),
  VA: z.boolean(),
  mail_info: z.boolean(),
  selected_program: z.enum(["Short Bar", "Bar Management",
                            "All Games", "Two Games", "One Game"]),
  program_cost: z.number().min(0),
  program_hours: z.number().min(0),
  status: z.enum(["Prospect", "Student", "Graduate", "Dropped"]),
  reference: z.enum(["Google", "Facebook", "Instagram",
                     "Friend", "Family", "Other"]),
  referral_name: z.string().min(2).max(255).optional(),
  first_contact_date: z.date(),
  last_contact_date: z.date(),
  call_back_date: z.date().optional(),
  call_taken_by: z.enum(["Mark", "Instructor", "Owner", "Other"]),
  scheduled_appointment: z.boolean(),
  appointment_date: z.date().optional(),
  appointment_time_hour: z.number().min(1).max(12).optional(),
  appointment_time_min: z.number().min(0).max(59).optional(),
  appointment_time_am_pm: z.enum(["AM", "PM"]).optional(),
  classes: z.enum(["Morning", "Afternoon", "Evening", "Night"]).optional(),
  interviewed_by: z.enum(["Mark", "Instructor", "Owner", "Other"]),
  interview_date: z.date(),
  start_date: z.date().optional(),
  expected_graduation_date: z.date().optional(),
  enrolled_by: z.enum(["Mark", "Instructor", "Owner", "Other"]),
  enrollment_date: z.date(),
  additional_notes: z.string().min(1).max(255).optional(),
})

type ComboOption = {
  value: string;
  label: string;
};

const states: ComboOption[] = 
  FormSchema.shape.state._def.values.map((state: string) => ({
  value: state,
  label: state,
}));
const selected_programs: ComboOption[] = 
  FormSchema.shape.selected_program._def.values.map((selected_program: string) => ({
  value: selected_program,
  label: selected_program,
}));
const references: ComboOption[] =
  FormSchema.shape.reference._def.values.map((item: string) => ({
  value: item,
  label: item,
}));
const call_taken_bys: ComboOption[] =
  FormSchema.shape.call_taken_by._def.values.map((item: string) => ({
  value: item,
  label: item,
}));
const statuses: ComboOption[] =
  FormSchema.shape.status._def.values.map((item: string) => ({
  value: item,
  label: item,
}));
const appointment_time_am_pms: ComboOption[] = [
  { value: "AM", label: "AM" },
  { value: "PM", label: "PM" },
];
const appointment_time_hours: ComboOption[] =
  Array.from({length: 12}, (_, i) => i + 1).map((hour: number) => ({
  value: hour.toString(),
  label: hour.toString(),
}));
const appointment_time_minutes: ComboOption[] =
  Array.from({ length: 12 }, (_, i) => i * 5).map((minute: number) => {
  const value = minute < 10 ? `0${minute}` : minute.toString();
  return {
    value,
    label: value,
  };
});
const sexes: ComboOption[] =
  FormSchema.shape.sex._def.values.map((item: string) => ({
  value: item,
  label: item,
}));
const races: ComboOption[] =
  FormSchema.shape.race._def.values.map((item: string) => ({
  value: item,
  label: item,
}));
const ethnicities: ComboOption[] =
  FormSchema.shape.ethnicity._def.values.map((item: string) => ({
  value: item,
  label: item,
}));
const monthNames: string[] = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const date_of_birth_months: ComboOption[] = monthNames.map((month, index) => ({
  value: (index + 1).toString(), 
  label: month,
}));

const date_of_birth_days: ComboOption[] =
  Array.from({ length: 31 }, (_, i) => i + 1).map((day: number) => ({
  value: day.toString(),
  label: day.toString(),
}));
const date_of_birth_years: ComboOption[] =
  Array.from({ length: (new Date().getFullYear() - 21) - 1900 }, (_, i) => i + 1900).map((year: number) => ({
  value: year.toString(),
  label: year.toString(),
}));
const prior_educations: ComboOption[] =
  FormSchema.shape.prior_education._def.values.map((item: string) => ({
  value: item,
  label: item,
}));

export default function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      address_1: "",
      address_2: "",
      city: "",
      zip_code: "",
      program_cost: 0,
      program_hours: 0,
      scheduled_appointment: false, 
      appointment_time_hour: 12,
      appointment_time_min: 0,
      appointment_time_am_pm: "PM",
      classes: "Morning",
      interviewed_by: "Mark",
      enrolled_by: "Mark",
      additional_notes: "",
      prior_education: "None",
    },

  })
  const day = form.watch("date_of_birth_day");
  const month = form.watch("date_of_birth_month");
  const year = form.watch("date_of_birth_year");
useEffect(() => {

  if (day && month && year) {
    const date = new Date(year, month - 1, day);
    form.setValue("date_of_birth", date);
  }
}, [day, month, year, form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  return (
    <div className="admissions-form-container w-2/3 mx-auto">
    <h1 className="text-3xl font-bold text-center mb-6">Admissions</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">
            <div className="card-container flex flex-wrap gap-6 justify-center">

              <div className="personal-info-card flex-1 p-4 border rounded-lg min-w-[400px] max-w-[500px]">
                <h2 className="section-title text-lg font-medium mb-4">Student Information</h2>
                <div className="personal-info-grid grid grid-cols-1 gap-6 md:grid-cols-2 py-2">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem className="min-w-[170px]">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem className="min-w-[170px]">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="personal-info-grid grid grid-cols-1 gap-6 md:grid-cols-2 py-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="min-w-[170px]">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem className="min-w-[170px]">
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="address-grid grid grid-cols-1 gap-4 md:grid-cols-1 py-2">
                  <FormField
                    control={form.control}
                    name="address_1"
                    render={({ field }) => (
                      <FormItem className="min-w-[170px]">
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Address 1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address_2"
                    render={({ field }) => (
                      <FormItem className="min-w-[170px]">
                        <FormControl>
                          <Input placeholder="Address 2" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-3 gap-6 md:grid-cols-3 mt-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="min-w-[100px]">
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="min-w-[100px]">
                      <FormLabel>State</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                type="button"
                                className="w-full text-left text-white bg-gradient-to-r from-slate-900 to-slate-950"
                              >
                                {field.value ? states.find(state => state.value === field.value)?.label : "State"}
                                <CaretSortIcon className="h-4 w-8 pl-2" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-24 p-0">
                            <Command>
                              <CommandInput placeholder="Search state..." className="h-9" />
                              <CommandEmpty>No states found.</CommandEmpty>
                              <CommandGroup>
                                {states.map((state) => (
                                  <CommandItem
                                    value={state.label}
                                    key={state.value}
                                    className="h-6"
                                    onSelect={() => {
                                      form.setValue("state", state.value as typeof field.value)
                                    }}
                                  >
                                    {state.label}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        state.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zip_code"
                    render={({ field }) => (
                      <FormItem className="min-w-[100px]">
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Zip Code" className="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="personal-info-grid grid grid-cols-2 gap-6 md:grid-cols-3 py-2">

                  <FormField
                    control={form.control}
                    name="date_of_birth"
                    render={({ field }) => (
                      <FormItem className="flex flex-col pt-2 min-w-[140px]">
                        <FormLabel>Date of Birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  " pl-3 text-left font-normal bg-gradient-to-r from-slate-900 to-slate-950",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="p-0" align="start">
                          <div className="flex flex-row">
                            <FormField
                              control={form.control}
                              name="date_of_birth_month"
                              render={({ field }) => (
                                <FormItem className="">
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          type="button"
                                          className="text-left text-white text-sm max-w-[115px] bg-gradient-to-r from-slate-900 to-slate-950"
                                        >
                                          {field.value ? date_of_birth_months.find(date_of_birth_months => Number(date_of_birth_months.value) === field.value)?.label : "Month"}
                                          <CaretSortIcon className="h-4 w-8 pl-2" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                      <PopoverContent className="w-36 p-0">
                                        <Command>
                                          <CommandGroup>
                                            {date_of_birth_months.map((item) => (
                                              <CommandItem
                                                value={item.label}
                                                key={item.value}
                                                className="h-6"
                                                onSelect={() => {
                                                  form.setValue("date_of_birth_month", Number(item.value))
                                                }}
                                              >
                                                {item.label}
                                                <CheckIcon
                                                  className={cn(
                                                    "ml-auto h-4 w-4",
                                                    Number(item.value) === field.value
                                                      ? "opacity-100"
                                                      : "opacity-0"
                                                  )}
                                                />
                                              </CommandItem>
                                            ))}
                                          </CommandGroup>
                                        </Command>
                                      </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="date_of_birth_day"
                              render={({ field }) => (
                                <FormItem className="">
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          type="button"
                                          className="w-full text-left text-white max-w-[80px] bg-gradient-to-r from-slate-900 to-slate-950"
                                        >
                                          {field.value ? date_of_birth_days.find(date_of_birth_days => Number(date_of_birth_days.value) === field.value)?.label : "Day"}
                                          <CaretSortIcon className="h-4 w-8 pl-2" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                      <PopoverContent className="w-16 p-0">
                                        <Command>
                                          <CommandGroup>
                                            {date_of_birth_days.map((item) => (
                                              <CommandItem
                                                value={item.label}
                                                key={item.value}
                                                className="h-6"
                                                onSelect={() => {
                                                  form.setValue("date_of_birth_day", Number(item.value))
                                                }}
                                              >
                                                {item.label}
                                                <CheckIcon
                                                  className={cn(
                                                    "ml-auto h-4 w-4",
                                                    Number(item.value) === field.value
                                                      ? "opacity-100"
                                                      : "opacity-0"
                                                  )}
                                                />
                                              </CommandItem>
                                            ))}
                                          </CommandGroup>
                                        </Command>
                                      </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="date_of_birth_year"
                              render={({ field }) => (
                                <FormItem className="">
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          type="button"
                                          className="text-left max-w-[100px] text-white bg-gradient-to-r from-slate-900 to-slate-950"
                                        >
                                          {field.value ? date_of_birth_years.find(date_of_birth_years => Number(date_of_birth_years.value) === field.value)?.label : "Year"}
                                          <CaretSortIcon className="h-4 w-20 pl-2" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                      <PopoverContent className="w-24 p-0">
                                        <Command>
                                          <CommandGroup>
                                            {date_of_birth_years.map((item) => (
                                              <CommandItem
                                                value={item.label}
                                                key={item.value}
                                                className="h-6"
                                                onSelect={() => {
                                                  form.setValue("date_of_birth_year", Number(item.value))
                                                }}
                                              >
                                                {item.label}
                                                <CheckIcon
                                                  className={cn(
                                                    "ml-auto h-4 w-4",
                                                    Number(item.value) === field.value
                                                      ? "opacity-100"
                                                      : "opacity-0"
                                                  )}
                                                />
                                              </CommandItem>
                                            ))}
                                          </CommandGroup>
                                        </Command>
                                      </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="SSN"
                    render={({ field }) => (
                      <FormItem className="min-w-[120px] max-w-[140px]">
                        <FormLabel>SSN</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Social Security #" className="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sex"
                    render={({ field }) => (
                      <FormItem className="min-w-[115px]">
                        <FormLabel>Sex</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                type="button"
                                className="w-full text-left text-white bg-gradient-to-r from-slate-900 to-slate-950"
                              >
                                {field.value ? sexes.find(sexes => sexes.value === field.value)?.label : "Select sex"}
                                <CaretSortIcon className="h-4 w-8 pl-2" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-36 p-0">
                            <Command>
                              <CommandInput placeholder="Student's sex" className="h-9" />
                              <CommandEmpty>No sex found</CommandEmpty>
                              <CommandGroup>
                                {sexes.map((item) => (
                                  <CommandItem
                                    value={item.label}
                                    key={item.value}
                                    className="h-6"
                                    onSelect={() => {
                                      form.setValue("sex", item.value as typeof field.value)
                                    }}
                                  >
                                    {item.label}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        item.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="race"
                    render={({ field }) => (
                      <FormItem className="w-[125px]">
                        <FormLabel>Race</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                type="button"
                                className="w-full text-left text-white bg-gradient-to-r from-slate-900 to-slate-950"
                              >
                                {field.value ? races.find(races => races.value === field.value)?.label : "Select race"}
                                <CaretSortIcon className="h-4 w-8 pl-2" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-36 p-0">
                            <Command>
                              <CommandInput placeholder="Student's race" className="h-9" />
                              <CommandEmpty>No race found</CommandEmpty>
                              <CommandGroup>
                                {races.map((item) => (
                                  <CommandItem
                                    value={item.label}
                                    key={item.value}
                                    className="h-6"
                                    onSelect={() => {
                                      form.setValue("race", item.value as typeof field.value)
                                    }}
                                  >
                                    {item.label}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        item.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ethnicity"
                    render={({ field }) => (
                      <FormItem className="w-[135px]">
                        <FormLabel>Ethnicity</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                type="button"
                                className="w-full text-left text-white text-xs bg-gradient-to-r from-slate-900 to-slate-950"
                              >
                                {field.value ? ethnicities.find(ethnicities => ethnicities.value === field.value)?.label : "Select ethnicity"}
                                <CaretSortIcon className="h-4 w-8 pl-2" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-36 p-0">
                            <Command>
                              <CommandInput placeholder="Student's ethniciy" className="h-9" />
                              <CommandEmpty>No ethnicity found</CommandEmpty>
                              <CommandGroup>
                                {ethnicities.map((item) => (
                                  <CommandItem
                                    value={item.label}
                                    key={item.value}
                                    className="h-6"
                                    onSelect={() => {
                                      form.setValue("ethnicity", item.value as typeof field.value)
                                    }}
                                  >
                                    {item.label}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        item.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>
              </div>

              <div className="personal-info-card flex-1 p-4 border rounded-lg min-w-[400px] max-w-[500px]">
                <h2 className="section-title text-lg font-medium mb-4">Call & Appointment Information</h2>

                <div className="personal-info-grid grid grid-cols-2 gap-6 md:grid-cols-3 pb-4">

                  <FormField
                    control={form.control}
                    name="selected_program"
                    render={({ field }) => (
                      <FormItem className="min-w-[115px]">
                        <FormLabel>Selected Program</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                type="button"
                                className="w-full text-left text-white bg-gradient-to-r from-slate-900 to-slate-950"
                              >
                                {field.value ? selected_programs.find(selected_program => selected_program.value === field.value)?.label : "Program"}
                                <CaretSortIcon className="h-4 w-8 pl-2" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-44 p-0">
                            <Command>
                              <CommandInput placeholder="Search for program..." className="h-9" />
                              <CommandEmpty>No Programs found.</CommandEmpty>
                              <CommandGroup>
                                {selected_programs.map((selected_program) => (
                                  <CommandItem
                                    value={selected_program.label}
                                    key={selected_program.value}
                                    className="h-6"
                                    onSelect={() => {
                                      form.setValue("selected_program", selected_program.value as typeof field.value)
                                    }}
                                  >
                                    {selected_program.label}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        selected_program.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="min-w-[115px]">
                        <FormLabel>Student Status</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                type="button"
                                className="w-full text-left text-white bg-gradient-to-r from-slate-900 to-slate-950"
                              >
                                {field.value ? statuses.find(statuses => statuses.value === field.value)?.label : "Select status"}
                                <CaretSortIcon className="h-4 w-8 pl-2" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-44 p-0">
                            <Command>
                              <CommandInput placeholder="Search for status" className="h-9" />
                              <CommandEmpty>No caller found.</CommandEmpty>
                              <CommandGroup>
                                {statuses.map((item) => (
                                  <CommandItem
                                    value={item.label}
                                    key={item.value}
                                    className="h-6"
                                    onSelect={() => {
                                      form.setValue("status", item.value as typeof field.value)
                                    }}
                                  >
                                    {item.label}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        item.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="reference"
                    render={({ field }) => (
                      <FormItem className="min-w-[115px]">
                        <FormLabel>Reference</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                type="button"
                                className="w-full text-left text-white bg-gradient-to-r from-slate-900 to-slate-950"
                              >
                                {field.value ? references.find(references => references.value === field.value)?.label : "Reference"}
                                <CaretSortIcon className="h-4 w-8 pl-2" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-44 p-0">
                            <Command>
                              <CommandInput placeholder="Search for program..." className="h-9" />
                              <CommandEmpty>No references found.</CommandEmpty>
                              <CommandGroup>
                                {references.map((reference) => (
                                  <CommandItem
                                    value={reference.label}
                                    key={reference.value}
                                    className="h-6"
                                    onSelect={() => {
                                      form.setValue("reference", reference.value as typeof field.value)
                                    }}
                                  >
                                    {reference.label}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        reference.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="call_taken_by"
                    render={({ field }) => (
                      <FormItem className="min-w-[115px]">
                        <FormLabel>Call Taken By</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                type="button"
                                className="w-full text-left text-white bg-gradient-to-r from-slate-900 to-slate-950"
                              >
                                {field.value ? call_taken_bys.find(call_taken_bys => call_taken_bys.value === field.value)?.label : "Select caller"}
                                <CaretSortIcon className="h-4 w-8 pl-2" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-44 p-0">
                            <Command>
                              <CommandInput placeholder="Search for Caller" className="h-9" />
                              <CommandEmpty>No caller found.</CommandEmpty>
                              <CommandGroup>
                                {call_taken_bys.map((call_taken_by) => (
                                  <CommandItem
                                    value={call_taken_by.label}
                                    key={call_taken_by.value}
                                    className="h-6"
                                    onSelect={() => {
                                      form.setValue("call_taken_by", call_taken_by.value as typeof field.value)
                                    }}
                                  >
                                    {call_taken_by.label}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        call_taken_by.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="first_contact_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col pt-2 min-w-[115px]">
                        <FormLabel>First Contact Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  " pl-3 text-left font-normal bg-gradient-to-r from-slate-900 to-slate-950",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_contact_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col pt-2 min-w-[115px]">
                        <FormLabel>Last Contact Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  " pl-3 text-left font-normal bg-gradient-to-r from-slate-900 to-slate-950",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="appointment-grid grid gap-6 grid-cols-2 md:grid-cols-3 pb-4">

                  <FormField
                    control={form.control}
                    name="call_back_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col pt-2 min-w-[115px]">
                        <FormLabel>Call Back Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  " pl-3 text-left font-normal bg-gradient-to-r from-slate-900 to-slate-950",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="scheduled_appointment"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border py-4 px-2 shadow mt-3 w-[130px] h-[70px]">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            <div>Schedule Appointment</div>
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="appointment_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col pt-2 min-w-[120px] max-w-[140px]">
                        <FormLabel className="">Appointment Date & Time</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  " pl-3 text-left text-xs font-normal bg-gradient-to-r from-slate-900 to-slate-950",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">

                            <FormLabel className="text-lg pl-24">Select Time</FormLabel>

                            <div className="schedule-and-date grid grid-cols-3 px-2 py-1">

                              <FormField
                                control={form.control}
                                name="appointment_time_hour"
                                render={({ field }) => (
                                  <FormItem className="min-w-[50px]">
                                    <FormLabel> </FormLabel>
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <FormControl>
                                          <Button
                                            type="button"
                                            className="w-full text-left text-white bg-gradient-to-r from-slate-900 to-slate-950"
                                          >
                                          {field.value ? appointment_time_hours.find(appointment_time_hours => Number(appointment_time_hours.value) === field.value)?.label : ""}
                                            <CaretSortIcon className="h-4 w-8 pl-2" />
                                          </Button>
                                        </FormControl>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-44 p-0">
                                        <Command>
                                          <CommandInput placeholder="Search for status" className="h-9" />
                                          <CommandEmpty>No hours found.</CommandEmpty>
                                          <CommandGroup>
                                            {appointment_time_hours.map((item) => (
                                              <CommandItem
                                                value={item.label}
                                                key={item.value}
                                                className="h-6"
                                                onSelect={() => {
                                                  form.setValue("appointment_time_hour", Number(item.value) as typeof field.value)
                                                }}
                                              >
                                                {item.label}
                                                <CheckIcon
                                                  className={cn(
                                                    "ml-auto h-4 w-4",
                                                    Number(item.value) === field.value
                                                      ? "opacity-100"
                                                      : "opacity-0"
                                                  )}
                                                />
                                              </CommandItem>
                                            ))}
                                          </CommandGroup>
                                        </Command>
                                      </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="appointment_time_min"
                                render={({ field }) => (
                                  <FormItem className="min-w-[50px] ml-1">
                                    <FormLabel></FormLabel>
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <FormControl>
                                          <Button
                                            type="button"
                                            className="w-full text-left text-white bg-gradient-to-r from-slate-900 to-slate-950"
                                          >
                                          {field.value ? appointment_time_minutes.find(appointment_time_minutes => Number(appointment_time_minutes.value) === field.value)?.label : "00"}
                                            <CaretSortIcon className="h-4 w-8 pl-2" />
                                          </Button>
                                        </FormControl>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-44 p-0">
                                        <Command>
                                          <CommandInput placeholder="Search for status" className="h-9" />
                                          <CommandEmpty>No minutes found found.</CommandEmpty>
                                          <CommandGroup>
                                            {appointment_time_minutes.map((item) => (
                                              <CommandItem
                                                value={item.label}
                                                key={item.value}
                                                className="h-6"
                                                onSelect={() => {
                                                  form.setValue("appointment_time_min", Number(item.value) as typeof field.value)
                                                }}
                                              >
                                                {item.label}
                                                <CheckIcon
                                                  className={cn(
                                                    "ml-auto h-4 w-4",
                                                    Number(item.value) === field.value
                                                      ? "opacity-100"
                                                      : "opacity-0"
                                                  )}
                                                />
                                              </CommandItem>
                                            ))}
                                          </CommandGroup>
                                        </Command>
                                      </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="appointment_time_am_pm"
                                render={({ field }) => (
                                  <FormItem className="min-w-[50px] ml-1">
                                    <FormLabel> </FormLabel>
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <FormControl>
                                          <Button
                                            type="button"
                                            className="w-full text-left text-white bg-gradient-to-r from-slate-900 to-slate-950"
                                          >
                                          {field.value ? appointment_time_am_pms.find(appointment_time_am_pms => appointment_time_am_pms.value === field.value)?.label : ""}
                                            <CaretSortIcon className="h-4 w-8 pl-2" />
                                          </Button>
                                        </FormControl>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-44 p-0">
                                        <Command>
                                          <CommandGroup>
                                            {appointment_time_am_pms.map((item) => (
                                              <CommandItem
                                                value={item.label}
                                                key={item.value}
                                                className="h-6"
                                                onSelect={() => {
                                                  form.setValue("appointment_time_am_pm", item.value as typeof field.value)
                                                }}
                                              >
                                                {item.label}
                                                <CheckIcon
                                                  className={cn(
                                                    "ml-auto h-4 w-4",
                                                    item.value === field.value
                                                      ? "opacity-100"
                                                      : "opacity-0"
                                                  )}
                                                />
                                              </CommandItem>
                                            ))}
                                          </CommandGroup>
                                        </Command>
                                      </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <FormLabel className="text-lg pl-24 py-2">Select Date</FormLabel>
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mail_info"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border py-4 px-2 shadow mt-5 w-[120px] h-[65px]">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            <div className="text-xs">Mail Information</div>
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="prior_education"
                    render={({ field }) => (
                      <FormItem className="min-w-[100px]">
                        <FormLabel>Prior Education</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                type="button"
                                className="w-full text-left text-white bg-gradient-to-r from-slate-900 to-slate-950"
                              >
                                {field.value ? prior_educations.find(prior_educations => prior_educations.value === field.value)?.label : "Select prior education"}
                                <CaretSortIcon className="h-4 w-8 pl-2" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-44 p-0">
                            <Command>
                              <CommandInput placeholder="Search for prior educations" className="h-9" />
                              <CommandEmpty>No prior eduction found</CommandEmpty>
                              <CommandGroup>
                                {prior_educations.map((item) => (
                                  <CommandItem
                                    value={item.label}
                                    key={item.value}
                                    className="h-6"
                                    onSelect={() => {
                                      form.setValue("prior_education", item.value as typeof field.value)
                                    }}
                                  >
                                    {item.label}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        item.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="us_citizen"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border py-4 px-2 shadow mt-5 w-[130px] h-[50px]">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            <div>U.S. Citizen</div>
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                </div>

                <div className="appointment-grid grid gap-6 grid-cols-3 pb-4">

                  <FormField
                    control={form.control}
                    name="WIN"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border py-4 px-2 shadow mt-5 w-[100px] h-[50px]">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            <div>W.I.N.</div>
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="MTA"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border py-4 px-2 shadow mt-5 w-[100px] h-[50px]">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            <div>M.T.A</div>
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="VA"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border py-4 px-2 shadow mt-5 w-[100px] h-[50px]">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            <div>V.A.</div>
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="appointment-grid grid gap-6 grid-cols-2 md:grid-cols-3 pb-4">

                </div>

                <div className="appointment-grid grid gap-6 grid-cols-2 pt-10">
                  <div className="grid gap-4 grid-rows-2 grid-cols-1 border rounded-lg p-2">
                    <FormLabel className="text-lg text-center font-semibold">Program Cost:</FormLabel>
                    <FormLabel className="text-lg text-center">$10,00</FormLabel>
                  </div>
                  <div className="grid gap-4 grid-rows-2 grid-cols-1 border rounded-lg p-2">
                    <FormLabel className="text-lg text-center font-semibold">Program Hours:</FormLabel>
                    <FormLabel className="text-lg text-center">800</FormLabel>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center py-2 pb-4">
            <Button type="submit" className="mt-6 min-w-40 font-semibold text-lg">Enroll Student</Button>
          </div>
        </form>
      </Form>

    </div>
  )
}
