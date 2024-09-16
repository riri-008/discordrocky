require('dotenv').config();
const { Client, GatewayIntentBits, ButtonBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, ButtonStyle } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers, 
    ],
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', async member => {
    const welcomeChannelId = process.env.WELCOME_CHANNEL_ID;
    const channel = member.guild.channels.cache.get(welcomeChannelId);

    if (channel) {
        channel.send(`Welcome to UpsWing, ${member}! <:upswing:1284202896119959694> I'm **Rocky**, your personal guide!
- Make sure to read <#1277630697024131094>.
- Head over to <#1277630697183510673> to verify.`);
    } else {
        console.error('Welcome channel not found');
    }
});

client.on('interactionCreate', async interaction => {
    if (interaction.isButton() && interaction.customId === 'open_form') {
        const modal = new ModalBuilder()
            .setCustomId('tech_support_form')
            .setTitle('Tech Support Form')
            .addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('issue_description')
                        .setLabel('Describe your issue')
                        .setStyle(TextInputStyle.Paragraph)
                )
            );

        await interaction.showModal(modal);
    } else if (interaction.type === InteractionType.ModalSubmit && interaction.customId === 'tech_support_form') {
        const issueDescription = interaction.fields.getTextInputValue('issue_description');
        const supportChannelId = process.env.SUPPORT_CHANNEL_ID;
        const supportChannel = interaction.guild.channels.cache.get(supportChannelId);

        if (supportChannel) {
            supportChannel.send(`New tech support request from ${interaction.user}:\n${issueDescription}\n <@&${'1284192393872277545'}>`);
        } else {
            console.error('Support channel not found');
        }

        await interaction.reply({ content: 'Your request has been submitted!', ephemeral: true });
    }
});

// Sending a message with a button in the tech-support channel
client.on('ready', async () => {
    const techSupportChannelId = process.env.TECH_SUPPORT_CHANNEL_ID;
    const techSupportChannel = client.channels.cache.get(techSupportChannelId);

    if (techSupportChannel) {
        const messages = await techSupportChannel.messages.fetch({ limit: 100 });
        const existingMessage = messages.find(msg => msg.content.includes('If you need tech support, please click the button below to fill out a form:'));

        if (!existingMessage) {
            const button = new ButtonBuilder()
                .setCustomId('open_form')
                .setLabel('Open Tech Support Form')
                .setStyle(ButtonStyle.Primary);

            const row = new ActionRowBuilder().addComponents(button);

            techSupportChannel.send({
                content: 'If you need tech support, please click the button below to fill out a form:',
                components: [row]
            });
        }
    } else {
        console.error('Tech support channel not found');
    }
});

// Sending a message with a button in the teacher-endorsement channel
client.on('ready', async () => {
    const teacherEndorsementChannelId = process.env.TEACHER_ENDORSEMENT_CHANNEL_ID;
    const teacherEndorsementChannel = client.channels.cache.get(teacherEndorsementChannelId);

    if (teacherEndorsementChannel) {
        const messages = await teacherEndorsementChannel.messages.fetch({ limit: 100 });
        const existingMessage = messages.find(msg => msg.content.includes('Kindly fill out the form to submit teacher endorsement to the Operations Wing:'));

        if (!existingMessage) {
            const button = new ButtonBuilder()
                .setCustomId('open_teacher_endorsement_form')
                .setLabel('Open Teacher Endorsement Form')
                .setStyle(ButtonStyle.Primary);

            const row = new ActionRowBuilder().addComponents(button);

            teacherEndorsementChannel.send({
                content: 'Kindly fill out the form to submit teacher endorsement to the Operations Wing:',
                components: [row]
            });
        }
    } else {
        console.error('Teacher endorsement channel not found');
    }
});

client.on('interactionCreate', async interaction => {
    if (interaction.isButton() && interaction.customId === 'open_teacher_endorsement_form') {
        const modal = new ModalBuilder()
            .setCustomId('teacher_endorsement_form')
            .setTitle('Teacher Endorsement Form')
            .addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('endorsement_reason')
                        .setLabel('New Teacher Endorsement from HR and T&D')
                        .setStyle(TextInputStyle.Paragraph)
                )
            );

        await interaction.showModal(modal);
    } else if (interaction.type === InteractionType.ModalSubmit && interaction.customId === 'teacher_endorsement_form') {
        const endorsementReason = interaction.fields.getTextInputValue('endorsement_reason');
        const opsTeamChannelId = process.env.OPS_TEAM_CHANNEL_ID;
        const opsTeamChannel = interaction.guild.channels.cache.get(opsTeamChannelId);

        if (opsTeamChannel) {
            opsTeamChannel.send(`New teacher endorsement request from ${interaction.user}:\n${endorsementReason}\n <@&${'1277630696730660877'}>`);
        } else {
            console.error('Ops team channel not found');
        }

        await interaction.reply({ content: 'Your request has been submitted!', ephemeral: true });
    }
});


// Sending a message with a button in the teacher-onboarding channel
client.on('ready', async () => {
    const teacherOnboardingChannelId = process.env.TEACHER_ONBOARDING_CHANNEL_ID;
    const teacherOnboardingChannel = client.channels.cache.get(teacherOnboardingChannelId);

    if (teacherOnboardingChannel) {
        const messages = await teacherOnboardingChannel.messages.fetch({ limit: 100 });
        const existingMessage = messages.find(msg => msg.content.includes('Kindly fill out the form to submit teacher onboarding to the Operations Wing:'));

        if (!existingMessage) {
            const button = new ButtonBuilder()
                .setCustomId('open_teacher_onboarding_form')
                .setLabel('Open Teacher Onboarding Form')
                .setStyle(ButtonStyle.Primary);

            const row = new ActionRowBuilder().addComponents(button);

            teacherOnboardingChannel.send({
                content: 'Kindly fill out the form to submit teacher onboarding to the Operations Wing:',
                components: [row]
            });
        }
    } else {
        console.error('Teacher onboarding channel not found');
    }
});

client.on('interactionCreate', async interaction => {
    if (interaction.isButton() && interaction.customId === 'open_teacher_onboarding_form') {
        const modal = new ModalBuilder()
            .setCustomId('teacher_onboarding_form')
            .setTitle('Teacher Onboarding Form')
            .addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('onboarding_details')
                        .setLabel('New Teacher Onboarding from HR and T&D')
                        .setStyle(TextInputStyle.Paragraph)
                )
            );

        await interaction.showModal(modal);
    } else if (interaction.type === InteractionType.ModalSubmit && interaction.customId === 'teacher_onboarding_form') {
        const onboardingDetails = interaction.fields.getTextInputValue('onboarding_details');
        const opsTeamChannelId = process.env.OPS_TEAM_CHANNEL_ID;
        const opsTeamChannel = interaction.guild.channels.cache.get(opsTeamChannelId);

        if (opsTeamChannel) {
            opsTeamChannel.send(`New teacher onboarding request from ${interaction.user}:\n${onboardingDetails}\n <@&${'1277630696730660877'}>`);
        } else {
            console.error('Ops team channel not found');
        }

        await interaction.reply({ content: 'Your request has been submitted!', ephemeral: true });
    }
});


// Sending a message with a button in the student-registration channel
client.on('ready', async () => {
    const studentRegistrationChannelId = process.env.STUDENT_REGISTRATION_CHANNEL_ID;
    const studentRegistrationChannel = client.channels.cache.get(studentRegistrationChannelId);

    if (studentRegistrationChannel) {
        const messages = await studentRegistrationChannel.messages.fetch({ limit: 100 });
        const existingMessage = messages.find(msg => msg.content.includes('Please fill out the form to register a student following this format:'));

        if (!existingMessage) {
            const button = new ButtonBuilder()
                .setCustomId('open_student_registration_form')
                .setLabel('Open Student Registration Form')
                .setStyle(ButtonStyle.Primary);

            const row = new ActionRowBuilder().addComponents(button);

            studentRegistrationChannel.send({
                content: `Please fill out the form to register a student following this format:
Student ID: (leave blank if needed from Ops) 
Status: Trial/Subscribed 
Student Name: 
Phone Number: 
Gender: 
Date of Birth: 
English Level: 
Assessment Result: Adult/Young Evaluation - [score/total] 
Notes: 
- Who introduced you? 
- Have you studied English before? 
- What device are you going to use for online classes? 
Lesson Material Recommendation from DSSI:`,
                components: [row]
            });
        }
    } else {
        console.error('Student registration channel not found');
    }
});

client.on('interactionCreate', async interaction => {
    if (interaction.isButton() && interaction.customId === 'open_student_registration_form') {
        const modal = new ModalBuilder()
            .setCustomId('student_registration_form')
            .setTitle('Student Registration Form')
            .addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('registration_details')
                        .setLabel('Student Registration Details')
                        .setStyle(TextInputStyle.Paragraph)
                )
            );

        await interaction.showModal(modal);
    } else if (interaction.type === InteractionType.ModalSubmit && interaction.customId === 'student_registration_form') {
        const registrationDetails = interaction.fields.getTextInputValue('registration_details');
        const opsTeamChannelId = process.env.OPS_TEAM_CHANNEL_ID;
        const opsTeamChannel = interaction.guild.channels.cache.get(opsTeamChannelId);

        if (opsTeamChannel) {
            opsTeamChannel.send(`New student registration request from ${interaction.user}:\n${registrationDetails}\n <@&${'1277630696730660877'}>`);
        } else {
            console.error('Ops team channel not found');
        }

        await interaction.reply({ content: 'Your request has been submitted!', ephemeral: true });
    }
});

// Sending a message with a button in the playback-request channel
client.on('ready', async () => {
    const playbackRequestChannelId = process.env.PLAYBACK_REQUEST_CHANNEL_ID;
    const playbackRequestChannel = client.channels.cache.get(playbackRequestChannelId);

    if (playbackRequestChannel) {
        const messages = await playbackRequestChannel.messages.fetch({ limit: 100 });
        const existingMessage = messages.find(msg => msg.content.includes('Please fill out the form to request a playback. Kindly indicate the student, teacher, lesson name with date of class:'));

        if (!existingMessage) {
            const button = new ButtonBuilder()
                .setCustomId('open_playback_request_form')
                .setLabel('Open Playback Request Form')
                .setStyle(ButtonStyle.Primary);

            const row = new ActionRowBuilder().addComponents(button);

            playbackRequestChannel.send({
                content: 'Please fill out the form to request a playback. Kindly indicate the student, teacher, lesson name with date of class:',
                components: [row]
            });
        }
    } else {
        console.error('Playback request channel not found');
    }
});

client.on('interactionCreate', async interaction => {
    if (interaction.isButton() && interaction.customId === 'open_playback_request_form') {
        const modal = new ModalBuilder()
            .setCustomId('playback_request_form')
            .setTitle('Playback Request Form')
            .addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('playback_details')
                        .setLabel('Playback Request Details')
                        .setStyle(TextInputStyle.Paragraph)
                )
            );

        await interaction.showModal(modal);
    } else if (interaction.type === InteractionType.ModalSubmit && interaction.customId === 'playback_request_form') {
        const playbackDetails = interaction.fields.getTextInputValue('playback_details');
        const opsTeamChannelId = process.env.OPS_TEAM_CHANNEL_ID;
        const opsTeamChannel = interaction.guild.channels.cache.get(opsTeamChannelId);

        if (opsTeamChannel) {
            opsTeamChannel.send(`New playback request from ${interaction.user}:\n${playbackDetails}\n <@&${'1277630696730660877'}>`);
        } else {
            console.error('Ops team channel not found');
        }

        await interaction.reply({ content: 'Your request has been submitted!', ephemeral: true });
    }
});

// Sending a message with a button in the class-request channel
client.on('ready', async () => {
    const classRequestChannelId = process.env.CLASS_REQUEST_CHANNEL_ID;
    const classRequestChannel = client.channels.cache.get(classRequestChannelId);

    if (classRequestChannel) {
        const messages = await classRequestChannel.messages.fetch({ limit: 100 });
        const existingMessage = messages.find(msg => msg.content.includes('Submit a class request to Ops team and pair students with available teachers.'));

        if (!existingMessage) {
            const button = new ButtonBuilder()
                .setCustomId('open_class_request_form')
                .setLabel('Open Class Request Form')
                .setStyle(ButtonStyle.Primary);

            const row = new ActionRowBuilder().addComponents(button);

            classRequestChannel.send({
                content: `Submit a class request to Ops team and pair students with available teachers. 

Please have the following information ready:
- Teacher Name
- Date and Time 
- Student Name (get from DSSI)
- Lesson Material

Note: For demos, default lesson material is Let's Begin Lesson 1.`,
                components: [row]
            });
        }
    } else {
        console.error('Class request channel not found');
    }
});

client.on('interactionCreate', async interaction => {
    if (interaction.isButton() && interaction.customId === 'open_class_request_form') {
        const modal = new ModalBuilder()
            .setCustomId('class_request_form')
            .setTitle('Class Request Form')
            .addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('teacher_name')
                        .setLabel('Teacher Name')
                        .setStyle(TextInputStyle.Short)
                ),
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('date_time')
                        .setLabel('Date and Time')
                        .setStyle(TextInputStyle.Short)
                ),
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('student_name')
                        .setLabel('Student Name (get from DSSI)')
                        .setStyle(TextInputStyle.Short)
                ),
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('lesson_material')
                        .setLabel('Lesson Material')
                        .setStyle(TextInputStyle.Paragraph)
                )
            );

        await interaction.showModal(modal);
    } else if (interaction.type === InteractionType.ModalSubmit && interaction.customId === 'class_request_form') {
        const teacherName = interaction.fields.getTextInputValue('teacher_name');
        const dateTime = interaction.fields.getTextInputValue('date_time');
        const studentName = interaction.fields.getTextInputValue('student_name');
        const lessonMaterial = interaction.fields.getTextInputValue('lesson_material');
        const opsTeamChannelId = process.env.OPS_TEAM_CHANNEL_ID;
        const opsTeamChannel = interaction.guild.channels.cache.get(opsTeamChannelId);

        if (opsTeamChannel) {
            opsTeamChannel.send(`New class request from ${interaction.user}:
Teacher Name: ${teacherName}
Date and Time: ${dateTime}
Student Name: ${studentName}
Lesson Material: ${lessonMaterial}\n <@&${'1277630696730660877'}>`);
        } else {
            console.error('Ops team channel not found');
        }

        await interaction.reply({ content: 'Your request has been submitted!', ephemeral: true });
    }
});

// Sending a message with a button in the meeting-summaries channel
client.on('ready', async () => {
    const meetingSummariesChannelId = process.env.MEETING_SUMMARIES_CHANNEL_ID;
    const meetingSummariesChannel = client.channels.cache.get(meetingSummariesChannelId);

    if (meetingSummariesChannel) {
        const messages = await meetingSummariesChannel.messages.fetch({ limit: 100 });
        const existingMessage = messages.find(msg => msg.content.includes('Request a meeting summary from the Ops team.'));

        if (!existingMessage) {
            const button = new ButtonBuilder()
                .setCustomId('open_meeting_summary_form')
                .setLabel('Open Meeting Summary Form')
                .setStyle(ButtonStyle.Primary);

            const row = new ActionRowBuilder().addComponents(button);

            meetingSummariesChannel.send({
                content: `Request a meeting summary from the Ops team.`,
                components: [row]
            });
        }
    } else {
        console.error('Meeting summaries channel not found');
    }
});

client.on('interactionCreate', async interaction => {
    if (interaction.isButton() && interaction.customId === 'open_meeting_summary_form') {
        const modal = new ModalBuilder()
            .setCustomId('meeting_summary_form')
            .setTitle('Meeting Summary Form')
            .addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('meeting_summary')
                        .setLabel('Meeting Summary')
                        .setStyle(TextInputStyle.Paragraph)
                )
            );

        await interaction.showModal(modal);
    } else if (interaction.type === InteractionType.ModalSubmit && interaction.customId === 'meeting_summary_form') {
        const meetingSummary = interaction.fields.getTextInputValue('meeting_summary');
        const opsTeamChannelId = process.env.OPS_TEAM_CHANNEL_ID;
        const opsTeamChannel = interaction.guild.channels.cache.get(opsTeamChannelId);

        if (opsTeamChannel) {
            opsTeamChannel.send(`New meeting summary from ${interaction.user}:\n${meetingSummary}\n <@&${'1277630696730660877'}>`);
        } else {
            console.error('Ops team channel not found');
        }

        await interaction.reply({ content: 'Your meeting summary has been submitted!', ephemeral: true });
    }
});

// Sending a message with a button in the channel-request channel
client.on('ready', async () => {
    const channelRequestChannelId = process.env.CHANNEL_REQUEST_CHANNEL_ID;
    const channelRequestChannel = client.channels.cache.get(channelRequestChannelId);

    if (channelRequestChannel) {
        const messages = await channelRequestChannel.messages.fetch({ limit: 100 });
        const existingMessage = messages.find(msg => msg.content.includes('Submit a channel request to the tech support team.'));

        if (!existingMessage) {
            const button = new ButtonBuilder()
                .setCustomId('open_channel_request_form')
                .setLabel('Open Channel Request Form')
                .setStyle(ButtonStyle.Primary);

            const row = new ActionRowBuilder().addComponents(button);

            channelRequestChannel.send({
                content: `Submit a channel request to the tech support team.`,
                components: [row]
            });
        }
    } else {
        console.error('Channel request channel not found');
    }
});

client.on('interactionCreate', async interaction => {
    if (interaction.isButton() && interaction.customId === 'open_channel_request_form') {
        const modal = new ModalBuilder()
            .setCustomId('channel_request_form')
            .setTitle('Channel Request Form')
            .addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('channel_request_details')
                        .setLabel('Channel Request Details')
                        .setStyle(TextInputStyle.Paragraph)
                )
            );

        await interaction.showModal(modal);
    } else if (interaction.type === InteractionType.ModalSubmit && interaction.customId === 'channel_request_form') {
        const channelRequestDetails = interaction.fields.getTextInputValue('channel_request_details');
        const supportChannelId = process.env.SUPPORT_CHANNEL_ID;
        const supportChannel = interaction.guild.channels.cache.get(supportChannelId);

        if (supportChannel) {
            supportChannel.send(`New channel request from ${interaction.user}:\n${channelRequestDetails}\n <@&${'1284192393872277545'}>`);
        } else {
            console.error('Support channel not found');
        }

        await interaction.reply({ content: 'Your channel request has been submitted!', ephemeral: true });
    }
});


// Sending a message with a button in the courseware-request channel
client.on('ready', async () => {
    const coursewareRequestChannelId = process.env.COURSEWARE_REQUEST_CHANNEL_ID;
    const coursewareRequestChannel = client.channels.cache.get(coursewareRequestChannelId);

    if (coursewareRequestChannel) {
        const messages = await coursewareRequestChannel.messages.fetch({ limit: 100 });
        const existingMessage = messages.find(msg => msg.content.includes('Submit a courseware request to the academic team.'));

        if (!existingMessage) {
            const button = new ButtonBuilder()
                .setCustomId('open_courseware_request_form')
                .setLabel('Open Courseware Request Form')
                .setStyle(ButtonStyle.Primary);

            const row = new ActionRowBuilder().addComponents(button);

            coursewareRequestChannel.send({
                content: `Submit a courseware request to the academic team.`,
                components: [row]
            });
        }
    } else {
        console.error('Courseware request channel not found');
    }
});

client.on('interactionCreate', async interaction => {
    if (interaction.isButton() && interaction.customId === 'open_courseware_request_form') {
        const modal = new ModalBuilder()
            .setCustomId('courseware_request_form')
            .setTitle('Courseware Request Form')
            .addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('courseware_request_details')
                        .setLabel('Courseware Request Details')
                        .setStyle(TextInputStyle.Paragraph)
                )
            );

        await interaction.showModal(modal);
    } else if (interaction.type === InteractionType.ModalSubmit && interaction.customId === 'courseware_request_form') {
        const coursewareRequestDetails = interaction.fields.getTextInputValue('courseware_request_details');
        const academicChannelId = process.env.ACADEMIC_CHANNEL_ID;
        const academicChannel = interaction.guild.channels.cache.get(academicChannelId);

        if (academicChannel) {
            academicChannel.send(`New courseware request from ${interaction.user}:\n${coursewareRequestDetails}\n <@&${'1284192292244029543'}>`);
        } else {
            console.error('Academic channel not found');
        }

        await interaction.reply({ content: 'Your courseware request has been submitted!', ephemeral: true });
    }
});

client.once('ready', async () => {
    const rulesChannelId = process.env.RULES_CHANNEL_ID;
    const rulesChannel = client.channels.cache.get(rulesChannelId);

    if (rulesChannel) {
        const messages = await rulesChannel.messages.fetch({ limit: 100 });
        const existingMessage = messages.find(msg => msg.content.includes('RULES'));

        if (!existingMessage) {
            const 
            embed = {
                title: "RULES",
                description: `Welcome to UpsWing! Online English Academy! 
                To ensure a positive and productive environment, please adhere to the following rules:
                **Respect Everyone**: Treat all members with kindness and respect. Harassment, discrimination, and bullying will not be tolerated.
                **No Spamming**: Avoid sending repetitive messages, advertisements, or irrelevant links. Keep the discussions meaningful and on-topic.
                **Use Appropriate Channels**: Post your messages in the correct channels. Read the channel descriptions to understand their purpose.
                **No NSFW Content**: Do not share any explicit, offensive, or inappropriate content. This includes images, videos, and links.
                **Stay On-Topic**: Keep conversations relevant to the channel’s topic. Off-topic discussions should be moved to the appropriate channels.
                **Protect Privacy**: Do not share personal information (yours or others') without consent. Respect everyone’s privacy.
                **Follow Discord’s Terms of Service**: Adhere to all of Discord’s community guidelines and terms of service.
                **Be Helpful**: Support and encourage other members. Share your knowledge and resources generously.
                **Report Issues**: If you encounter any problems or witness rule violations, report them to the moderators.`,
                image: {
                    url: 'https://upswingonlineacademy.com/rules.png'
                }
            };

            rulesChannel.send({ 
                content: `RULES`,
                embeds: [embed] });
        }
    } else {
        console.error('Rules channel not found');
    }
});

client.login(process.env.DISCORD_TOKEN);
