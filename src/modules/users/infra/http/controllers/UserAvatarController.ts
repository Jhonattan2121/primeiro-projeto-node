import { Response, Request } from "express";
import { container } from 'tsyringe';
import { instanceToInstance } from "class-transformer";

import UpdateUSerAvatarService from "@modules/users/services/UpdateUserAvatarService";

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUSerAvatar = container.resolve(UpdateUSerAvatarService);

    const user = await updateUSerAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    })

    delete user.password;

    return response.json(instanceToInstance(user));
  }
}