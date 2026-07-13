# JobNova Page Referencing Graph

This document contains a visual representation of all pages/endpoints in the JobNova application and how they link to each other.

- **Nodes**: Represent pages/endpoints (routes) inside the `app/pages` directory.
- **Directed Edges**: Indicate a reference/link from page A to page B (via `NuxtLink`, `router.push`, or `navigateTo`).
- **Self-referencing Loops**: Show that a page contains a link back to itself.

Total Pages/Endpoints: 44
Total Directed Connections: 296

## Diagram

```mermaid
flowchart TD
    page_0["/applicants-tracking-employer-dashboard"]
    page_1["/applied-jobs-dashboard"]
    page_2["/candidate-profile-employer-dashboard"]
    page_3["/career-portal-flow"]
    page_4["/company-profile-employer-dashboard"]
    page_5["/company-profile"]
    page_6["/employer-dashboard-1"]
    page_7["/employer-dashboard-2"]
    page_8["/employer-pending-approval"]
    page_9["/employer-registration-pending-1"]
    page_10["/employer-registration-pending-2"]
    page_11["/frontend-developer-details"]
    page_12["/government-jobs"]
    page_13["/ (Home)"]
    page_14["/job-agent"]
    page_15["/job-screening-chat"]
    page_16["/job-search"]
    page_17["/jobseeker-dashboard"]
    page_18["/login-attempt-pending"]
    page_19["/login"]
    page_20["/manage-jobs-employer-dashboard"]
    page_21["/my-career-hub"]
    page_22["/my-profile-dashboard"]
    page_23["/post-a-new-job-employer-dashboard"]
    page_24["/premium-modern-homepage"]
    page_25["/private-jobs"]
    page_26["/professional-homepage"]
    page_27["/register-choose-account-type"]
    page_28["/register-employer-step-1"]
    page_29["/register-employer-step-2"]
    page_30["/register-job-seeker-2-step-1"]
    page_31["/register-job-seeker-2-step-2"]
    page_32["/register-job-seeker-2-step-3"]
    page_33["/register-job-seeker-chat"]
    page_34["/register-job-seeker-step-2-variant-1-detailed-education"]
    page_35["/register-job-seeker-step-2-variant-2-grouped-education"]
    page_36["/register-job-seeker-step-2-variant-3-institution-focus"]
    page_37["/register-job-seeker-step-2"]
    page_38["/register-job-seeker"]
    page_39["/register-recruiter"]
    page_40["/selected-jobs-dashboard"]
    page_41["/showcase"]
    page_42["/ssc-cgl-2026-details"]
    page_43["/success"]

    page_13 --> page_13
    page_13 --> page_7
    page_13 --> page_12
    page_13 --> page_15
    page_13 --> page_16
    page_13 --> page_17
    page_13 --> page_19
    page_13 --> page_21
    page_13 --> page_23
    page_13 --> page_25
    page_13 --> page_27
    page_13 --> page_28
    page_0 --> page_0
    page_0 --> page_4
    page_0 --> page_7
    page_0 --> page_19
    page_0 --> page_20
    page_0 --> page_23
    page_1 --> page_13
    page_1 --> page_1
    page_1 --> page_14
    page_1 --> page_16
    page_1 --> page_17
    page_1 --> page_19
    page_1 --> page_22
    page_2 --> page_13
    page_2 --> page_0
    page_2 --> page_7
    page_2 --> page_12
    page_2 --> page_16
    page_2 --> page_17
    page_2 --> page_19
    page_2 --> page_21
    page_2 --> page_23
    page_2 --> page_25
    page_2 --> page_27
    page_2 --> page_28
    page_3 --> page_13
    page_3 --> page_7
    page_3 --> page_12
    page_3 --> page_15
    page_3 --> page_16
    page_3 --> page_17
    page_3 --> page_19
    page_3 --> page_21
    page_3 --> page_23
    page_3 --> page_25
    page_3 --> page_27
    page_3 --> page_28
    page_5 --> page_13
    page_5 --> page_1
    page_5 --> page_14
    page_5 --> page_16
    page_5 --> page_17
    page_5 --> page_19
    page_5 --> page_22
    page_4 --> page_0
    page_4 --> page_4
    page_4 --> page_7
    page_4 --> page_19
    page_4 --> page_20
    page_4 --> page_23
    page_6 --> page_13
    page_6 --> page_0
    page_6 --> page_4
    page_6 --> page_7
    page_6 --> page_17
    page_6 --> page_20
    page_7 --> page_0
    page_7 --> page_4
    page_7 --> page_7
    page_7 --> page_19
    page_7 --> page_20
    page_7 --> page_23
    page_8 --> page_13
    page_9 --> page_13
    page_10 --> page_13
    page_11 --> page_13
    page_11 --> page_7
    page_11 --> page_12
    page_11 --> page_15
    page_11 --> page_16
    page_11 --> page_17
    page_11 --> page_19
    page_11 --> page_21
    page_11 --> page_23
    page_11 --> page_25
    page_11 --> page_27
    page_11 --> page_28
    page_12 --> page_13
    page_12 --> page_7
    page_12 --> page_12
    page_12 --> page_16
    page_12 --> page_17
    page_12 --> page_19
    page_12 --> page_21
    page_12 --> page_23
    page_12 --> page_25
    page_12 --> page_27
    page_12 --> page_28
    page_14 --> page_13
    page_14 --> page_1
    page_14 --> page_14
    page_14 --> page_16
    page_14 --> page_17
    page_14 --> page_19
    page_14 --> page_22
    page_15 --> page_13
    page_15 --> page_17
    page_15 --> page_19
    page_16 --> page_13
    page_16 --> page_7
    page_16 --> page_12
    page_16 --> page_15
    page_16 --> page_16
    page_16 --> page_17
    page_16 --> page_19
    page_16 --> page_21
    page_16 --> page_23
    page_16 --> page_25
    page_16 --> page_27
    page_16 --> page_28
    page_17 --> page_13
    page_17 --> page_1
    page_17 --> page_14
    page_17 --> page_16
    page_17 --> page_17
    page_17 --> page_19
    page_17 --> page_22
    page_17 --> page_33
    page_19 --> page_17
    page_19 --> page_19
    page_19 --> page_20
    page_19 --> page_27
    page_19 --> page_37
    page_18 --> page_13
    page_18 --> page_19
    page_18 --> page_28
    page_20 --> page_0
    page_20 --> page_4
    page_20 --> page_7
    page_20 --> page_19
    page_20 --> page_20
    page_20 --> page_23
    page_21 --> page_13
    page_21 --> page_17
    page_21 --> page_19
    page_21 --> page_21
    page_21 --> page_40
    page_22 --> page_13
    page_22 --> page_1
    page_22 --> page_14
    page_22 --> page_16
    page_22 --> page_17
    page_22 --> page_19
    page_22 --> page_22
    page_23 --> page_0
    page_23 --> page_4
    page_23 --> page_7
    page_23 --> page_19
    page_23 --> page_20
    page_23 --> page_23
    page_24 --> page_13
    page_24 --> page_7
    page_24 --> page_12
    page_24 --> page_16
    page_24 --> page_17
    page_24 --> page_19
    page_24 --> page_21
    page_24 --> page_23
    page_24 --> page_25
    page_24 --> page_27
    page_24 --> page_28
    page_25 --> page_13
    page_25 --> page_7
    page_25 --> page_12
    page_25 --> page_15
    page_25 --> page_16
    page_25 --> page_17
    page_25 --> page_19
    page_25 --> page_21
    page_25 --> page_23
    page_25 --> page_25
    page_25 --> page_27
    page_25 --> page_28
    page_26 --> page_13
    page_26 --> page_7
    page_26 --> page_12
    page_26 --> page_16
    page_26 --> page_17
    page_26 --> page_19
    page_26 --> page_21
    page_26 --> page_23
    page_26 --> page_25
    page_26 --> page_27
    page_26 --> page_28
    page_27 --> page_13
    page_27 --> page_19
    page_27 --> page_28
    page_27 --> page_38
    page_28 --> page_13
    page_28 --> page_19
    page_28 --> page_29
    page_29 --> page_13
    page_29 --> page_8
    page_29 --> page_19
    page_29 --> page_28
    page_38 --> page_13
    page_38 --> page_19
    page_38 --> page_37
    page_30 --> page_13
    page_30 --> page_19
    page_31 --> page_13
    page_31 --> page_19
    page_32 --> page_13
    page_32 --> page_19
    page_33 --> page_13
    page_33 --> page_17
    page_33 --> page_38
    page_37 --> page_17
    page_34 --> page_13
    page_34 --> page_16
    page_34 --> page_21
    page_35 --> page_13
    page_35 --> page_16
    page_35 --> page_21
    page_36 --> page_13
    page_36 --> page_16
    page_36 --> page_21
    page_39 --> page_13
    page_39 --> page_16
    page_39 --> page_19
    page_39 --> page_21
    page_40 --> page_13
    page_40 --> page_1
    page_40 --> page_7
    page_40 --> page_12
    page_40 --> page_16
    page_40 --> page_17
    page_40 --> page_19
    page_40 --> page_21
    page_40 --> page_23
    page_40 --> page_25
    page_40 --> page_27
    page_40 --> page_28
    page_41 --> page_13
    page_41 --> page_0
    page_41 --> page_1
    page_41 --> page_2
    page_41 --> page_3
    page_41 --> page_4
    page_41 --> page_6
    page_41 --> page_7
    page_41 --> page_8
    page_41 --> page_9
    page_41 --> page_10
    page_41 --> page_11
    page_41 --> page_12
    page_41 --> page_16
    page_41 --> page_17
    page_41 --> page_19
    page_41 --> page_18
    page_41 --> page_20
    page_41 --> page_21
    page_41 --> page_22
    page_41 --> page_23
    page_41 --> page_24
    page_41 --> page_25
    page_41 --> page_26
    page_41 --> page_27
    page_41 --> page_28
    page_41 --> page_29
    page_41 --> page_38
    page_41 --> page_30
    page_41 --> page_31
    page_41 --> page_32
    page_41 --> page_37
    page_41 --> page_34
    page_41 --> page_35
    page_41 --> page_36
    page_41 --> page_39
    page_41 --> page_40
    page_41 --> page_42
    page_41 --> page_43
    page_42 --> page_13
    page_42 --> page_7
    page_42 --> page_12
    page_42 --> page_16
    page_42 --> page_17
    page_42 --> page_19
    page_42 --> page_21
    page_42 --> page_23
    page_42 --> page_25
    page_42 --> page_27
    page_42 --> page_28
    page_43 --> page_13
```

## Detailed Pages List

Here is the list of all pages identified in the application along with their outgoing references:

### `/applicants-tracking-employer-dashboard` (File: `app/pages/applicants-tracking-employer-dashboard.vue`)
Links to:
- `/applicants-tracking-employer-dashboard`
- `/company-profile-employer-dashboard`
- `/employer-dashboard-2`
- `/login`
- `/manage-jobs-employer-dashboard`
- `/post-a-new-job-employer-dashboard`

### `/applied-jobs-dashboard` (File: `app/pages/applied-jobs-dashboard.vue`)
Links to:
- `/`
- `/applied-jobs-dashboard`
- `/job-agent`
- `/job-search`
- `/jobseeker-dashboard`
- `/login`
- `/my-profile-dashboard`

### `/candidate-profile-employer-dashboard` (File: `app/pages/candidate-profile-employer-dashboard.vue`)
Links to:
- `/`
- `/applicants-tracking-employer-dashboard`
- `/employer-dashboard-2`
- `/government-jobs`
- `/job-search`
- `/jobseeker-dashboard`
- `/login`
- `/my-career-hub`
- `/post-a-new-job-employer-dashboard`
- `/private-jobs`
- `/register-choose-account-type`
- `/register-employer-step-1`

### `/career-portal-flow` (File: `app/pages/career-portal-flow.vue`)
Links to:
- `/`
- `/employer-dashboard-2`
- `/government-jobs`
- `/job-screening-chat`
- `/job-search`
- `/jobseeker-dashboard`
- `/login`
- `/my-career-hub`
- `/post-a-new-job-employer-dashboard`
- `/private-jobs`
- `/register-choose-account-type`
- `/register-employer-step-1`

### `/company-profile-employer-dashboard` (File: `app/pages/company-profile-employer-dashboard.vue`)
Links to:
- `/applicants-tracking-employer-dashboard`
- `/company-profile-employer-dashboard`
- `/employer-dashboard-2`
- `/login`
- `/manage-jobs-employer-dashboard`
- `/post-a-new-job-employer-dashboard`

### `/company-profile` (File: `app/pages/company-profile.vue`)
Links to:
- `/`
- `/applied-jobs-dashboard`
- `/job-agent`
- `/job-search`
- `/jobseeker-dashboard`
- `/login`
- `/my-profile-dashboard`

### `/employer-dashboard-1` (File: `app/pages/employer-dashboard-1.vue`)
Links to:
- `/`
- `/applicants-tracking-employer-dashboard`
- `/company-profile-employer-dashboard`
- `/employer-dashboard-2`
- `/jobseeker-dashboard`
- `/manage-jobs-employer-dashboard`

### `/employer-dashboard-2` (File: `app/pages/employer-dashboard-2.vue`)
Links to:
- `/applicants-tracking-employer-dashboard`
- `/company-profile-employer-dashboard`
- `/employer-dashboard-2`
- `/login`
- `/manage-jobs-employer-dashboard`
- `/post-a-new-job-employer-dashboard`

### `/employer-pending-approval` (File: `app/pages/employer-pending-approval.vue`)
Links to:
- `/`

### `/employer-registration-pending-1` (File: `app/pages/employer-registration-pending-1.vue`)
Links to:
- `/`

### `/employer-registration-pending-2` (File: `app/pages/employer-registration-pending-2.vue`)
Links to:
- `/`

### `/frontend-developer-details` (File: `app/pages/frontend-developer-details.vue`)
Links to:
- `/`
- `/employer-dashboard-2`
- `/government-jobs`
- `/job-screening-chat`
- `/job-search`
- `/jobseeker-dashboard`
- `/login`
- `/my-career-hub`
- `/post-a-new-job-employer-dashboard`
- `/private-jobs`
- `/register-choose-account-type`
- `/register-employer-step-1`

### `/government-jobs` (File: `app/pages/government-jobs.vue`)
Links to:
- `/`
- `/employer-dashboard-2`
- `/government-jobs`
- `/job-search`
- `/jobseeker-dashboard`
- `/login`
- `/my-career-hub`
- `/post-a-new-job-employer-dashboard`
- `/private-jobs`
- `/register-choose-account-type`
- `/register-employer-step-1`

### `/` (File: `app/pages/index.vue`)
Links to:
- `/`
- `/employer-dashboard-2`
- `/government-jobs`
- `/job-screening-chat`
- `/job-search`
- `/jobseeker-dashboard`
- `/login`
- `/my-career-hub`
- `/post-a-new-job-employer-dashboard`
- `/private-jobs`
- `/register-choose-account-type`
- `/register-employer-step-1`

### `/job-agent` (File: `app/pages/job-agent.vue`)
Links to:
- `/`
- `/applied-jobs-dashboard`
- `/job-agent`
- `/job-search`
- `/jobseeker-dashboard`
- `/login`
- `/my-profile-dashboard`

### `/job-screening-chat` (File: `app/pages/job-screening-chat.vue`)
Links to:
- `/`
- `/jobseeker-dashboard`
- `/login`

### `/job-search` (File: `app/pages/job-search.vue`)
Links to:
- `/`
- `/employer-dashboard-2`
- `/government-jobs`
- `/job-screening-chat`
- `/job-search`
- `/jobseeker-dashboard`
- `/login`
- `/my-career-hub`
- `/post-a-new-job-employer-dashboard`
- `/private-jobs`
- `/register-choose-account-type`
- `/register-employer-step-1`

### `/jobseeker-dashboard` (File: `app/pages/jobseeker-dashboard.vue`)
Links to:
- `/`
- `/applied-jobs-dashboard`
- `/job-agent`
- `/job-search`
- `/jobseeker-dashboard`
- `/login`
- `/my-profile-dashboard`
- `/register-job-seeker-chat`

### `/login-attempt-pending` (File: `app/pages/login-attempt-pending.vue`)
Links to:
- `/`
- `/login`
- `/register-employer-step-1`

### `/login` (File: `app/pages/login.vue`)
Links to:
- `/jobseeker-dashboard`
- `/login`
- `/manage-jobs-employer-dashboard`
- `/register-choose-account-type`
- `/register-job-seeker-step-2`

### `/manage-jobs-employer-dashboard` (File: `app/pages/manage-jobs-employer-dashboard.vue`)
Links to:
- `/applicants-tracking-employer-dashboard`
- `/company-profile-employer-dashboard`
- `/employer-dashboard-2`
- `/login`
- `/manage-jobs-employer-dashboard`
- `/post-a-new-job-employer-dashboard`

### `/my-career-hub` (File: `app/pages/my-career-hub.vue`)
Links to:
- `/`
- `/jobseeker-dashboard`
- `/login`
- `/my-career-hub`
- `/selected-jobs-dashboard`

### `/my-profile-dashboard` (File: `app/pages/my-profile-dashboard.vue`)
Links to:
- `/`
- `/applied-jobs-dashboard`
- `/job-agent`
- `/job-search`
- `/jobseeker-dashboard`
- `/login`
- `/my-profile-dashboard`

### `/post-a-new-job-employer-dashboard` (File: `app/pages/post-a-new-job-employer-dashboard.vue`)
Links to:
- `/applicants-tracking-employer-dashboard`
- `/company-profile-employer-dashboard`
- `/employer-dashboard-2`
- `/login`
- `/manage-jobs-employer-dashboard`
- `/post-a-new-job-employer-dashboard`

### `/premium-modern-homepage` (File: `app/pages/premium-modern-homepage.vue`)
Links to:
- `/`
- `/employer-dashboard-2`
- `/government-jobs`
- `/job-search`
- `/jobseeker-dashboard`
- `/login`
- `/my-career-hub`
- `/post-a-new-job-employer-dashboard`
- `/private-jobs`
- `/register-choose-account-type`
- `/register-employer-step-1`

### `/private-jobs` (File: `app/pages/private-jobs.vue`)
Links to:
- `/`
- `/employer-dashboard-2`
- `/government-jobs`
- `/job-screening-chat`
- `/job-search`
- `/jobseeker-dashboard`
- `/login`
- `/my-career-hub`
- `/post-a-new-job-employer-dashboard`
- `/private-jobs`
- `/register-choose-account-type`
- `/register-employer-step-1`

### `/professional-homepage` (File: `app/pages/professional-homepage.vue`)
Links to:
- `/`
- `/employer-dashboard-2`
- `/government-jobs`
- `/job-search`
- `/jobseeker-dashboard`
- `/login`
- `/my-career-hub`
- `/post-a-new-job-employer-dashboard`
- `/private-jobs`
- `/register-choose-account-type`
- `/register-employer-step-1`

### `/register-choose-account-type` (File: `app/pages/register-choose-account-type.vue`)
Links to:
- `/`
- `/login`
- `/register-employer-step-1`
- `/register-job-seeker`

### `/register-employer-step-1` (File: `app/pages/register-employer-step-1.vue`)
Links to:
- `/`
- `/login`
- `/register-employer-step-2`

### `/register-employer-step-2` (File: `app/pages/register-employer-step-2.vue`)
Links to:
- `/`
- `/employer-pending-approval`
- `/login`
- `/register-employer-step-1`

### `/register-job-seeker-2-step-1` (File: `app/pages/register-job-seeker-2-step-1.vue`)
Links to:
- `/`
- `/login`

### `/register-job-seeker-2-step-2` (File: `app/pages/register-job-seeker-2-step-2.vue`)
Links to:
- `/`
- `/login`

### `/register-job-seeker-2-step-3` (File: `app/pages/register-job-seeker-2-step-3.vue`)
Links to:
- `/`
- `/login`

### `/register-job-seeker-chat` (File: `app/pages/register-job-seeker-chat.vue`)
Links to:
- `/`
- `/jobseeker-dashboard`
- `/register-job-seeker`

### `/register-job-seeker-step-2-variant-1-detailed-education` (File: `app/pages/register-job-seeker-step-2-variant-1-detailed-education.vue`)
Links to:
- `/`
- `/job-search`
- `/my-career-hub`

### `/register-job-seeker-step-2-variant-2-grouped-education` (File: `app/pages/register-job-seeker-step-2-variant-2-grouped-education.vue`)
Links to:
- `/`
- `/job-search`
- `/my-career-hub`

### `/register-job-seeker-step-2-variant-3-institution-focus` (File: `app/pages/register-job-seeker-step-2-variant-3-institution-focus.vue`)
Links to:
- `/`
- `/job-search`
- `/my-career-hub`

### `/register-job-seeker-step-2` (File: `app/pages/register-job-seeker-step-2.vue`)
Links to:
- `/jobseeker-dashboard`

### `/register-job-seeker` (File: `app/pages/register-job-seeker.vue`)
Links to:
- `/`
- `/login`
- `/register-job-seeker-step-2`

### `/register-recruiter` (File: `app/pages/register-recruiter.vue`)
Links to:
- `/`
- `/job-search`
- `/login`
- `/my-career-hub`

### `/selected-jobs-dashboard` (File: `app/pages/selected-jobs-dashboard.vue`)
Links to:
- `/`
- `/applied-jobs-dashboard`
- `/employer-dashboard-2`
- `/government-jobs`
- `/job-search`
- `/jobseeker-dashboard`
- `/login`
- `/my-career-hub`
- `/post-a-new-job-employer-dashboard`
- `/private-jobs`
- `/register-choose-account-type`
- `/register-employer-step-1`

### `/showcase` (File: `app/pages/showcase.vue`)
Links to:
- `/`
- `/applicants-tracking-employer-dashboard`
- `/applied-jobs-dashboard`
- `/candidate-profile-employer-dashboard`
- `/career-portal-flow`
- `/company-profile-employer-dashboard`
- `/employer-dashboard-1`
- `/employer-dashboard-2`
- `/employer-pending-approval`
- `/employer-registration-pending-1`
- `/employer-registration-pending-2`
- `/frontend-developer-details`
- `/government-jobs`
- `/job-search`
- `/jobseeker-dashboard`
- `/login`
- `/login-attempt-pending`
- `/manage-jobs-employer-dashboard`
- `/my-career-hub`
- `/my-profile-dashboard`
- `/post-a-new-job-employer-dashboard`
- `/premium-modern-homepage`
- `/private-jobs`
- `/professional-homepage`
- `/register-choose-account-type`
- `/register-employer-step-1`
- `/register-employer-step-2`
- `/register-job-seeker`
- `/register-job-seeker-2-step-1`
- `/register-job-seeker-2-step-2`
- `/register-job-seeker-2-step-3`
- `/register-job-seeker-step-2`
- `/register-job-seeker-step-2-variant-1-detailed-education`
- `/register-job-seeker-step-2-variant-2-grouped-education`
- `/register-job-seeker-step-2-variant-3-institution-focus`
- `/register-recruiter`
- `/selected-jobs-dashboard`
- `/ssc-cgl-2026-details`
- `/success`

### `/ssc-cgl-2026-details` (File: `app/pages/ssc-cgl-2026-details.vue`)
Links to:
- `/`
- `/employer-dashboard-2`
- `/government-jobs`
- `/job-search`
- `/jobseeker-dashboard`
- `/login`
- `/my-career-hub`
- `/post-a-new-job-employer-dashboard`
- `/private-jobs`
- `/register-choose-account-type`
- `/register-employer-step-1`

### `/success` (File: `app/pages/success.vue`)
Links to:
- `/`

