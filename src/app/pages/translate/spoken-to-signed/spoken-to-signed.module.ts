import {NgModule} from '@angular/core';

import {TextToSpeechModule} from '../../../components/text-to-speech/text-to-speech.module';
import {SpeechToTextModule} from '../../../components/speech-to-text/speech-to-text.module';
import {SpokenToSignedComponent} from './spoken-to-signed.component';
import {ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {SignWritingModule} from '../signwriting/signwriting.module';
import {PoseViewersModule} from '../pose-viewers/pose-viewers.module';
import {AppTranslocoModule} from '../../../core/modules/transloco/transloco.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CommonModule} from '@angular/common';
import {SpokenLanguageInputComponent} from './spoken-language-input/spoken-language-input.component';
import {SignedLanguageOutputComponent} from './signed-language-output/signed-language-output.component';

const componentModules = [SpeechToTextModule, TextToSpeechModule, SignWritingModule, PoseViewersModule];
const components = [SpokenToSignedComponent, SpokenLanguageInputComponent, SignedLanguageOutputComponent];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, AppTranslocoModule, MatTooltipModule, IonicModule, ...componentModules],
  declarations: components,
  exports: components,
})
export class SpokenToSignedModule {}
