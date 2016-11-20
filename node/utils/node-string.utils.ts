import { StringUtils } from './../../core/utils';

var h2p = require('html2plaintext');

export class NodeStringUtils implements StringUtils {

    htmlToPlainText = (html: string): string => h2p(html);

}