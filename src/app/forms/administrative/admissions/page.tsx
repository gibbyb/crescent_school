"use client"

//import Link from "next/link";
//import { db } from "~/server/db"
export const dynamic = "force-dynamic";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  //FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { toast } from "~/components/ui/use-toast"
import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
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
  sex: z.enum(["Male", "Female", "Other"]),
  race: z.enum(["White", "Black", "Hispanic",
                "Asian", "Pacific Islander", "Other"]).optional(),
  ethnicity: z.enum(["Hispanic", "Non-Hispanic"]).optional(),
  date_of_birth: z.date(),
  prior_education: z.enum(["High School", "GED", "Some College",
                           "Associates", "Bachelors",
                           "Masters", "Doctorate"]).optional(),
  us_citizen: z.boolean(),
  selected_program: z.enum(["None Selected", "Short Bar", "Bar Management",
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
  call_taken_by: z.string().min(2).max(255).optional(),
  scheduled_appointment: z.boolean(),
  appointment_time: z.date().optional(),
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

const states: ComboOption[] = FormSchema.shape.state._def.values.map((state: string) => ({
  value: state,
  label: state,
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
      sex: "Male",
      race: "Other",
      ethnicity: "Non-Hispanic",
      us_citizen: false,
      selected_program: "None Selected",
      program_cost: 0,
      program_hours: 0,
      status: "Prospect",
      reference: "Other",
      call_taken_by: "",
      scheduled_appointment: false, 
      classes: "Morning",
      interviewed_by: "Mark",
      enrolled_by: "Mark",
      additional_notes: "",
    },

  })

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
    <div className="form-container w-2/3 mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">
            <div className="row1-container flex flex-wrap gap-6">

              <div className="personal-info-card flex-1 p-4 border rounded-lg">
                <h2 className="section-title text-lg font-medium mb-4">Personal Information</h2>
                <div className="personal-info-grid grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
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
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
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
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="address-card flex-1 p-4 border rounded-lg">
                <h2 className="section-title text-lg font-medium mb-4">Address</h2>
                <div className="address-grid grid grid-cols-1 gap-4 md:grid-cols-1">
                  <FormField
                    control={form.control}
                    name="address_1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
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
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Address 2" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
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
                      <FormItem>
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
                          <PopoverContent className="w-48 p-0">
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
                      <FormItem>
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Zip Code" className="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="personal-info-card flex-1 p-4 border rounded-lg">
                <h2 className="section-title text-lg font-medium mb-4">Personal Information</h2>
                <div className="personal-info-grid grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
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
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
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
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

            </div>
          </div>
          <Button type="submit" className="mt-6">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
