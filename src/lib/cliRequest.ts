import colors from 'colors';

import siteConfig from './config/site';

const ASCII_ART = `${colors.yellow(`
        ╔╦╦≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣╦╦╗          ${colors.magenta.bold('Sebastiano Racca')}
        ╠╫╣                              ╠╫╣          ${colors.magenta.dim('Full Stack Developer')}
        ╠╫╣                    ╔═╗╦╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╦
        ╚╩╝                    ╚═╝                    ${colors.cyan.dim('Email: ') + colors.cyan('sebastiano@racca.me')}
 ╦╗╗╗╗╗╗╗╗╗╗╗╗╗╗╗╗╦╔═╗                   ╠╫╣          ${colors.cyan.dim('GitHub: ') + colors.cyan('https://github.com/SebaOfficial')}
        ╠╫╣        ╚═╝                   ╠╫╣          ${colors.cyan.dim('LinkedIn: ') + colors.cyan('https://linkedin.com/in/sebastiano-racca')}
        ╠╫╣                   ╔═╗╦╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╦   ${colors.cyan.dim('Blog: ') + colors.cyan('https://blog.racca.me')}
        ╚╩╝                   ╚═╝
 ╦╗╗╗╗╗╗╗╗╗╗╗╗╗╗╗╗╦╔═╗                   ╠╫╣
        ╠╫╣        ╚═╝                   ╠╫╣
        ╚╩╩≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣╩╩╝

          ╔≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣╗
          ╚≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣╝`)}

${colors.dim('You are seeing this because you requested https://racca.me via curl')}\n`;

export const handleRequest = () => new Response(ASCII_ART);
